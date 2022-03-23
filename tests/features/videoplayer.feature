#language: ru

Функционал: Добавление, редактирование и удаление видео
  Я захожу на страницу складов, вхожу как Admin. Ввожу данные в поле, где ссылка.
  После этого видео должно добавиться на страницу
  После этого редактирую данные о видео
  После этого удаляю видео

  @editVideo
  Сценарий: Редактирование видео

    Допустим я зашёл на страницу "user/login"
    Если я ввожу данные:
      | email    | admin@gmail.com |
      | password | 12345678        |
    И нажимаю на кнопку "войти"
    То я вижу текст "Вы авторизированы!"

    Допустим я зашёл на страницу "alga-express/wareHouses"
    И нажимаю на кнопку "Редактировать видео"
    Затем я ввожу данные:
      | //*[@id="mui-1"] | "https://www.youtube.com/watch?v=5_HWXQLWYbA" |
    И нажимаю на кнопку "Применить"
    То я вижу текст "Видео отредактировано"

  @removeVideo
  Сценарий: Удаление видео

    Допустим я зашёл на страницу "user/login"
    Если я ввожу данные:
      | email    | admin@gmail.com |
      | password | 12345678        |
    И нажимаю на кнопку "войти"
    То я вижу текст "Вы авторизированы!"

    Допустим я зашёл на страницу "alga-express/wareHouses"
    И нажимаю на кнопку "Удалить видео"
    Затем я нажимаю на кнопку "Да"
    То я вижу текст "Видео удалено!"

  @addVideo
  Сценарий: Добавление видео на страницу

    Допустим я зашёл на страницу "user/login"
    Если я ввожу данные:
      | email    | admin@gmail.com |
      | password | 12345678        |
    И нажимаю на кнопку "войти"
    То я вижу текст "Вы авторизированы!"

    Допустим я зашёл на страницу "alga-express/player/add"
    Затем я ввожу данные:
      | //*[@id="mui-1"] | "https://www.youtube.com/watch?v=hhRkNABtu9k" |
    И нажимаю на кнопку "Сохранить"
    То я вижу текст "Видео добавлено!"