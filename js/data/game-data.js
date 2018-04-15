export const INITIAL_GAME = Object.freeze({
  lives: 3,
  time: 300
});

export const guessArtistData = {
  type: `guessArtist`,

  questions:
    {
      src: `https://www.youtube.com/audiolibrary_download?vid=bcbe5be936a32fb1`,
      answers: [
        {
          text: `Пелагея`,
          image: `https://i.vimeocdn.com/portrait/992615_300x300`
        },
        {
          text: `Краснознаменная дивизия имени моей бабушки`,
          image: `https://i.ytimg.com/vi/jzgM3m8Vp1k/maxresdefault.jpg`
        },
        {
          text: `Lorde`,
          image: `https://yt3.ggpht.com/-fkDeGauT7Co/AAAAAAAAAAI/AAAAAAAAAAA/dkF5ZKkrxRo/s900-c-k-no-mo-rj-c0xffffff/photo.jpg`
        }
      ],
      rightAnswer: 2
    }
};

export const guessGenreData = {
  type: `guessArtist`,

  questions:
    {
      text: `Выберите инди-рок треки`,
      answers: [
        {
          src: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
          genre: `Pop`
        },

        {
          src: `https://www.youtube.com/audiolibrary_download?vid=bcbe5be936a32fb1`,
          genre: `Rock`
        },
        {
          src: `https://www.youtube.com/audiolibrary_download?vid=bcbe5be936a32fb1`,
          genre: `Pop`
        },
        {
          src: `https://www.youtube.com/audiolibrary_download?vid=bcbe5be936a32fb1`,
          genre: `Rock`
        }
      ],
      rightAnswers: [1, 3]
    }
};

export const statistics = [];
