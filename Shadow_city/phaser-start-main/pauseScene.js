class PauseScene extends Phaser.Scene {
    constructor() {
        super('Pause');
      }
      
      preload() {
        this.load.image('menu_button', 'assets/menu_button.png');
        this.load.image('resume_button', 'assets/resume_button.png');
        this.load.image('music_button', 'assets/music_button.png');
      }

      create() {
        this.add.text(this.game.config.width / 2, this.game.config.height / 2 - 250, 'Пауза', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);

        // Кнопка "Meню"
        let menu_button = this.add.image(730, 300, 'menu_button')//.setOrigin(0.5)
        menu_button.setInteractive();
        menu_button.on('pointerdown', () => {
            this.scene.stop(this.scene.settings.data.activeSceneKey);
            this.scene.start('Menu');
        });

        // Кнопка "Музыка"
        let music_button = this.add.image(730, 450, 'music_button');
        music_button.setInteractive();
        music_button.on('pointerdown', () => {
            this.scene.pause('Pause');
            this.scene.launch('MusicSettings', {musicVolume: this.musicVolume, activeSceneKey: this.scene.settings.data.activeSceneKey});
            //this.scene.pause(this.scene.settings.data.activeSceneKey);
        });

        // Кнопка "Продолжить"
        let resume_button = this.add.image(730, 600, 'resume_button')//.setOrigin(0.5)
        resume_button.setInteractive({useHandCursor: true});
        resume_button.on('pointerdown', () => {
            this.scene.stop('Pause');
            this.scene.resume(this.scene.settings.data.activeSceneKey);
           //this.scene.wake(this.scene.settings.data.activeSceneKey);
        });

    }
}
