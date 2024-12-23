class MusicSettingsScene extends Phaser.Scene {
  constructor() {
      super('MusicSettings');
  }
  preload() {
      this.load.image('button_plus', 'assets/button_plus.png');
      this.load.image('button_minus', 'assets/button_minus.png');
      this.load.image('back_button', 'assets/back_button.png');
      this.load.image('fon_menumusic', 'assets/fon_menu.jpg');
  }

  create() {
    const fon_menumusic = this.add.image(0, 0, 'fon_menumusic').setOrigin(0, 0);
    fon_menumusic.displayWidth = 1920;
    fon_menumusic.displayHeight = 1080;
    this.init(this.scene.settings.data); // Инициализируем с данными сцены

    const buttonSpacing = 50;
    const buttonSize = 50;

    // Кнопка "+"
    this.addButton = this.add.image(this.game.config.width / 2 + 200, this.game.config.height / 2, 'button_plus').setInteractive().setScale(0.7);
    this.addButton.on('pointerdown', () => {
    this.adjustVolume(0.1);
    });

    // Кнопка "-"
    this.subButton = this.add.image(this.game.config.width / 2 - 200, this.game.config.height / 2, 'button_minus').setInteractive().setScale(0.7);
    this.subButton.on('pointerdown', () => {
    this.adjustVolume(-0.1);
    });


    // Текст для отображения текущей громкости
    this.volumeText = this.add.text(this.game.config.width / 2, this.game.config.height / 2, `Громкость: ${Math.round(this.musicVolume * 100)}%`, { fontSize: '24px', fill: '#fff' }).setOrigin(0.5);

    // Кнопка "Назад"
    let back_button = this.add.image(this.game.config.width / 2, 600, 'back_button').setOrigin(0.5);
    back_button.setInteractive();
    back_button.on('pointerdown', () => {
      this.registry.set('musicVolume', this.musicVolume); // Сохраняем громкость
      this.scene.stop('MusicSettings');
      this.scene.resume('Pause'); // Возвращаем на паузу

      // Попробуем возобновить музыку при возвращении
      const mainScene = this.scene.get(this.activeSceneKey);
      if (mainScene && mainScene.music_game) {
          mainScene.resumeMusic(); 
      }
  });
  
}

adjustVolume(value) {
  this.musicVolume = Phaser.Math.Clamp(this.musicVolume + value, 0, 1);
  this.registry.set('musicVolume', this.musicVolume); // Сохраните новое значение в реестре
  // Далее обновите текущее значение громкости в музыке и текст, который отображается
  this.updateMusicVolume(this.musicVolume);
  this.volumeText.setText(`Громкость: ${Math.round(this.musicVolume * 100)}%`);
}

updateMusicVolume(value) {
  const targetScene = this.scene.get(this.activeSceneKey);
  if (targetScene) {
      targetScene.setMusicVolume(value); // Убедитесь, что передаете правильную громкость
  } else {
      console.error(`Сцена с ключом ${this.activeSceneKey} не найдена!`);
  }
}
init(data) {
  this.musicVolume = data.musicVolume || this.registry.get('musicVolume') || 1;
  this.activeSceneKey = data.activeSceneKey;
}
}
