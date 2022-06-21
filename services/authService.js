const uuid = require("uuid");
const tokenService = require("./tokenService");
const {User, Token, db} = require("../db/models/index");
const UserDto = require("../dtos/userDto");
const bcrypt = require("bcrypt");
const ApiError = require("../exceptions/ApiError");

class AuthService {
    async registration ({firstName, lastName, email, password}) {
        const candidate = await User.findOne({
            where: {
                email: email
            }
        });

        if (candidate) {
            throw ApiError.BadRequest("User with this mail already exists");
        }

        const transaction = await db.sequelize.transaction();
        try {
            const activationLink = uuid.v4();
            const hashPassword = await bcrypt.hash(password, 6);
            const user = await User.create({
                firstName, lastName, email, password: hashPassword, activationLink, isActivated: false
            }, {
                transaction
            });

            const userDto = this.getUserDto(user);
            await tokenService.createToken(user.id, userDto.tokens.refreshToken, transaction);
            await transaction.commit();

            return userDto;
        } catch (e) {
            await transaction.rollback();
            throw ApiError.BadRequest("Transaction error");
        }
    }

    async login ({email, password}) {
        const user = await User.findOne({
            where: {
                email
            },
            include: Token
        })

        if (!user) {
            throw ApiError.BadRequest("User with this email not found");
        }

        const isPasswordsEqual = await bcrypt.compare(password, user.password);
        if (!isPasswordsEqual) {
            throw ApiError.BadRequest("Password is wrong");
        }

        const userDto = this.getUserDto(user);
        await user.token.update({ refreshToken: userDto.tokens.refreshToken });

        return userDto;
    }

    async activate (activationLink) {
        if (!activationLink) {
            throw ApiError.BadRequest("No link");
        }

        const user = await User.findOne({where: {activationLink}});
        if (!user) {
            throw ApiError.BadRequest("Incorrect activation link");
        }

        if (user.isActivated) {
            return {
                message: "User is already activated"
            };
        }

        await user.update({isActivated: true});
        return {
            message: "User successfully activated"
        };
    }

    async logout (refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }

        const token = await Token.findOne({where: {refreshToken}});
        if (!token) {
            throw ApiError.UnauthorizedError();
        }

        await token.update({refreshToken: null});
        return true;
    }

    async refresh (refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }

        const user = tokenService.validateRefreshToken(refreshToken);
        if (!user) {
            throw ApiError.UnauthorizedError();
        }

        const token = await Token.findOne({where: {refreshToken}, include: User});
        if (!token) {
            throw ApiError.UnauthorizedError();
        }
        console.log(token);

        const userDto = this.getUserDto(token.user);
        await token.update({refreshToken: userDto.tokens.refreshToken});

        return userDto;
    }

    getUserDto (user) {
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        userDto.tokens = tokens;

        return userDto;
    }
}

module.exports = new AuthService();