import PostModel from '../models/Post.js';

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate('user').exec();

    res.json(posts);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: 'All post error',
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;

    const updatedPost = await PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewCount: 1 },
      },
      {
        returnDocument: 'after',
      }
    );

    if (!updatedPost) {
      return res.status(404).json({
        message: 'Пост не найдена',
      });
    }

    res.json(updatedPost);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить пост',
    });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.userId;
    const post = await PostModel.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Статья не найдена' });
    }

    // Если id владельца статьи не совпадает с id пользователя, отправляющего запрос
    if (post.user.toString() !== userId) {
      return res.status(403).json({
        message: 'Нет доступа к удалению статьи',
      });
    }

    const deletedPost = await PostModel.findByIdAndDelete({ _id: postId });

    return res.json({ message: 'Статья успешно удалена' });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить статью',
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      book: req.body.book,
      text: req.body.text,
      imgURL: req.body.imgURL,
      user: req.userId,
    });

    const post = await doc.save();

    res.json(post);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: 'Post error',
    });
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.body.id;
    // const userId = req.userId;
    // const post = await PostModel.findById(postId);

    // if (post.user.toString() !== userId) {
    //   return res.status(403).json({
    //     message: 'Нет доступа к посту',
    //   });
    // }
    await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        book: req.body.book,
        text: req.body.text,
        imgURL: req.body.imgURL,
        user: req.userId,
      }
    );
    res.json({
      success: true,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: 'Post error',
    });
  }
};
