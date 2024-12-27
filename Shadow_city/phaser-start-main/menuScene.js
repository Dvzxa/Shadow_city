class MenuScene extends Phaser.Scene {
    constructor() {
      super('Menu'); // Имя сцены
    }

    preload() {
      this.load.image('fon_menu', 'assets/fon_menu.jpg'); // Замените на путь к вашему фону
      this.load.image('sur', 'assets/sur.png');
      this.load.image('button1', 'assets/button1.png');
      this.load.image('button2', 'assets/button2.png');
    }

    create() {
      let centerX = this.game.config.width / 2; // Центр по горизонтали
      let centerY = this.game.config.height / 2; // Центр по вертикали

      // Загрузка фона - Убедитесь, что фон имеет размер 1920x1080
      const fon_menu = this.add.image(0, 0, 'fon_menu').setOrigin(0, 0);
      fon_menu.displayWidth = 1920;
      fon_menu.displayHeight = 1080;

      const sur1 = this.add.image(350, 100, 'sur').setOrigin(0, 0);
      const sur2 = this.add.image(950, 100, 'sur').setOrigin(0, 0);
      // Заголовок меню
      this.add.text(centerX, centerY - 80, 'Shadows city', {
        fontSize: '64px',
        fill: '#fff' // Белый цвет текста
      }).setOrigin(0.5); // Центрирование текста

      // Кнопка "Начать игру"
      let startButton = this.add.image(750, 500, 'button1').setOrigin(0.5)
      startButton.setInteractive();
      startButton.on('pointerdown', () => {
          this.scene.start('Game');
      });

      // Кнопка "Выход"
      let exitButton = this.add.image(750, 600, 'button2').setOrigin(0.5).setScale(0.5); // Масштабирование по необходимости
      exitButton.setInteractive();
      exitButton.on('pointerdown', () => {
          window.close();
      });
    }
  }
