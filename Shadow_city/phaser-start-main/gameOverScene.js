class GameOverScene extends Phaser.Scene {
    constructor() {
        super('GameOver');
    }

    preload() {
        this.load.image('fon_menu', 'assets/fon_menu.jpg');
        this.load.image('replay_button', 'assets/replay_button.png'); // Замените на путь к вашему изображению кнопки
        this.load.image('button_exit', 'assets/button2.png');     // Замените на путь к вашему изображению кнопки
    }

    create() {
        const fon_menu = this.add.image(0, 0, 'fon_menu').setOrigin(0, 0);
        fon_menu.displayWidth = 1920;
        fon_menu.displayHeight = 1080;
        this.add.text(this.game.config.width / 2, this.game.config.height / 2 - 100, 'Игра окончена!', { fontSize: '48px', fill: '#fff' }).setOrigin(0.5);
        
        // Кнопка "Заново"
        let restartButton = this.add.image(this.game.config.width / 2, this.game.config.height / 2 + 50, 'replay_button').setInteractive().setScale();
        restartButton.on('pointerdown', () => {
            this.scene.stop();
            gameOver = false;
            this.scene.start('Game');
        });

        // Кнопка "Выйти"
        let exitButton = this.add.image(this.game.config.width / 2, this.game.config.height / 2 + 200, 'button_exit').setInteractive().setScale(0.7);
        exitButton.on('pointerdown', () => {
          this.scene.stop();
          gameOver = false;
          this.scene.start('Menu');
        });
      }
    }