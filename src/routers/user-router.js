import { Router } from 'express';
import { loginRequired, adminCheck, emptyObejctCheck } from '../middlewares';
import { userService } from '../services';

const userRouter = Router();

userRouter.post('/login', emptyObejctCheck, async function (req, res, next) {
  try {
    const { email, password } = req.body;
    const userToken = await userService.getUserToken({ email, password });

    res.status(200).json(userToken);
  } catch (error) {
    next(error);
  }
});

userRouter.post('/', emptyObejctCheck, async (req, res, next) => {
  try {
    const { fullName, email, password, address, phoneNumber } = req.body;
    const newUser = await userService.addUser({
      fullName,
      email,
      password,
      address,
      phoneNumber,
    });

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

userRouter.get('/:token', loginRequired, async function (req, res, next) {
  try {
    const currentUserId = req.currentUserId;
    const user = await userService.getUser({ _id: currentUserId });
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

userRouter.get('/', loginRequired, async function (req, res, next) {
  try {
    const users = await userService.getUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

userRouter.get('/:userId', loginRequired, async function (req, res, next) {
  try {
    const userId = req.params.userId;
    const user = await userService.getUser({ _id: userId });
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

userRouter.put(
  '/:userId',
  loginRequired,
  emptyObejctCheck,
  async function (req, res, next) {
    try {
      const userId = req.params.userId;
      const { fullName, password, address, phoneNumber, currentPassword } =
        req.body;
      const userInfoRequired = { userId, currentPassword };
      const toUpdate = {
        ...(fullName && { fullName }),
        ...(password && { password }),
        ...(address && { address }),
        ...(phoneNumber && { phoneNumber }),
      };
      const updatedUserInfo = await userService.setUser(
        userInfoRequired,
        toUpdate
      );
      res.status(200).json(updatedUserInfo);
    } catch (error) {
      next(error);
    }
  }
);

userRouter.delete('/:userId', loginRequired, async function (req, res, next) {
  try {
    const currentUserId = req.currentUserId;
    const userId = req.params.userId;
    let user;
    if (currentUserId === userId) {
      user = await userService.removeUser(userId);
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

userRouter.put(
  '/admin/:userId',
  emptyObejctCheck,
  adminCheck,
  async function (req, res, next) {
    try {
      const userId = req.params.userId;
      const {
        fullName,
        password,
        address,
        phoneNumber,
        role,
        currentPassword,
      } = req.body;

      const userInfoRequired = { userId, currentPassword };
      const toUpdate = {
        ...(fullName && { fullName }),
        ...(password && { password }),
        ...(address && { address }),
        ...(phoneNumber && { phoneNumber }),
        ...(role && { role }),
      };
      const updatedUserInfo = await userService.setUser(
        userInfoRequired,
        toUpdate
      );

      res.status(200).json(updatedUserInfo);
    } catch (error) {
      next(error);
    }
  }
);

userRouter.delete(
  '/admin/:userId',
  adminCheck,
  async function (req, res, next) {
    try {
      const userId = req.params.userId;
      const user = await userService.removeUser(userId);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
);

userRouter.get('/admin/check', adminCheck, async function (req, res, next) {
  try {
    res.status(200).json({ result: 'success' });
  } catch (error) {
    next(error);
  }
});

export { userRouter };
