class BaseGameScene extends Phaser.Scene {
    constructor(key) {
        super(key);
    }

    preload() {
        this.load.image('dom3', 'assets/dom3.png');
        this.load.spritesheet('ninja', 'assets/ninja.png', { frameWidth: 66, frameHeight: 80 });
        this.load.audio('music_game', 'assets/music_game.mp3');
        this.load.spritesheet('enemy', 'assets/enemy.png', { frameWidth: 67, frameHeight: 80 });
        this.load.image('suriken', 'assets/sur.png', { frameWidth: 184, frameHeight: 176 });
        this.load.image('portal', 'assets/portal.png');
        this.load.image('girl', 'assets/girl.png');
    }

    create() {
        this.gameOver = false;
        this.canThrow = true;
        this.cooldownTime=1000;
        this.cursors;
        this.player;
        this.platforms;
        this.physics.world.setBounds(0, 0, 3840, 1080);
        this.physics.world.gravity.y = 500;
        this.platforms = this.physics.add.staticGroup();
        this.enemies = this.physics.add.group();
        this.surikenGroup;
        this.music_game;
        this.scoreText;
        this.musicVolume = this.registry.get('musicVolume') || 1; // Получаем сохраненное значение громкости
        this.setMusicVolume(this.musicVolume);
        this.setMusicVolume(this.musicVolume);
        this.createMusic();
        this.createScoreText();
        this.createPlatforms();
        this.createPlayerAnimations();
        this.createPlayer();
        this.createEnemyAnimations();
        this.createSurikens();
        this.createControls();
        this.createCamera();
        this.createPortal(); 
        console.log(this.musicVolume);
    }
    
    
        createScoreText() {
            this.scoreText = this.add.text(16, 16, 'Score: '+ this.score, { fontSize: '32px', fill: '#000' });
            this.scoreText.setScrollFactor(0, 0);
        }
    
        createPlatforms(x,y) {
            this.platforms.create(x, y, 'dom3');
        }
    
        createPlayer() {
          this.player = this.physics.add.sprite(200, 600, 'ninja');
          this.player.setBounce(0.2);
          this.player.setCollideWorldBounds(true);
          this.physics.add.collider(this.player, this.platforms); 
        }
        createPlayerAnimations(){
            this.anims.create({
                key: 'left',
                frames: this.anims.generateFrameNumbers('ninja', { start: 0, end: 3 }),
                frameRate: 10,
                repeat: -1,
            });
        
            this.anims.create({
                key: 'turnright',
                frames: [{ key: 'ninja', frame: 5 }],
                frameRate: 20,
            });
            this.anims.create({
                key: 'turnleft',
                frames: [{ key: 'ninja', frame: 4 }],
                frameRate: 20,
            });
            this.anims.create({
                key: 'right',
                frames: this.anims.generateFrameNumbers('ninja', { start: 6, end: 9 }),
                frameRate: 10,
                repeat: -1,
            });
        }
    
        createEnemy(x, y, patrolXSpeed, patrolYSpeed) {
            console.log("createEnemy start:", "x:", x, "y:", y)
            const enemy = this.physics.add.sprite(x, y, 'enemy').setImmovable(false);
           
           enemy.patrolXSpeed = patrolXSpeed;
           enemy.patrolYSpeed = patrolYSpeed;
           enemy.body.setVelocity(enemy.patrolXSpeed, enemy.patrolYSpeed);
           enemy.body.setCollideWorldBounds(true);
           enemy.body.allowGravity = true;
           this.physics.add.collider(enemy, this.platforms);
    
           this.physics.add.collider(this.player, enemy, (player, enemy) => {
            if (player instanceof Phaser.GameObjects.Sprite && enemy instanceof Phaser.GameObjects.Sprite)
             {
                this.hitEnemy()
             }
           }, null, this);
    
           enemy.timerEvent = this.time.addEvent({
               delay: 2000,
               callback: () => {
                   enemy.patrolXSpeed *= -1;
                   enemy.body.setVelocity(enemy.patrolXSpeed, enemy.patrolYSpeed);
               },
               loop: true,
               callbackScope: this,
           });
          
           this.enemies.add(enemy);
       }
    
        createEnemyAnimations(){
            this.anims.create({
                key: 'enemy_left',
                frames: this.anims.generateFrameNumbers('enemy', { start: 0, end: 3 }), 
                frameRate: 10,
                repeat: -1
            });
            this.anims.create({
                key: 'enemy_right',
                frames: this.anims.generateFrameNumbers('enemy', { start: 5, end: 7 }), 
                frameRate: 10,
                repeat: -1
            });
        }
        
    
        updateEnemy(enemy) {
            if (enemy && enemy.active) { // Проверка на существование и активность
                if (enemy.body.velocity.x > 0) {
                    enemy.play('enemy_right', true);
                } else if (enemy.body.velocity.x < 0) {
                    enemy.play('enemy_left', true);
                }
        
                const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, enemy.x, enemy.y);
                if (distance < 200) {
                    let dx = this.player.x - enemy.x;
                    let speed = 80;
                    enemy.body.setVelocityX(speed * Math.sign(dx));
                } else {
                    enemy.body.setVelocityX(enemy.patrolXSpeed);
                }
            }
        }
        hitEnemy() {
            this.music_game.stop();
            this.scene.stop();
            this.gameOver = true;
            this.scene.start('GameOver');
        }
    
        createSurikens() {
            this.surikenGroup = this.physics.add.group({
                classType: Phaser.Physics.Arcade.Sprite,
                runChildUpdate: true
            });
            this.physics.add.collider(this.surikenGroup, this.enemies, this.killEnemy.bind(this));
            this.physics.add.collider(this.surikenGroup, this.platforms);
        }
    
        throwSuriken() {
            if (this.canThrow) {
                const shuriken = this.surikenGroup.create(this.player.x, this.player.y, 'suriken').setScale(0.1);
                shuriken.body.allowGravity = false;
        
                // Определение направления выстрела
                
                shuriken.setVelocityX(300 * this.lastDirection); // Устанавливаем скорость в зависимости от направления
        
                this.time.delayedCall(4000, () => {
                    this.surikenGroup.remove(shuriken, true, true);
                }, [], this);
        
                this.canThrow = false;
                this.time.delayedCall(this.cooldownTime, () => {
                    this.canThrow = true;
                }, [], this);
            }
        }
    
        killEnemy(suriken, enemy) {
            if (enemy) {
                enemy.timerEvent.remove(false); // Удаляем таймер у врага
                enemy.destroy(); // Уничтожаем врага
                suriken.destroy(); // Уничтожаем сюрикен
                this.score += 100; // Увеличиваем счет
                this.scoreText.setText('Score: ' + this.score); // Обновляем текст счета
                localStorage.setItem('score', this.score);
            }
        }
    
         createControls() {
        this.cursors = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
        });
        this.input.keyboard.on('keydown-SPACE', () => { this.throwSuriken(); });
        this.input.keyboard.on('keydown-ESC', () => {this.scene.pause(); this.music_game.pause(); this.scene.launch('Pause', { activeSceneKey: this.scene.key, musicVolume: this.musicVolume });});
    }

    
        createCamera() {
            const deadzone = 200;
            this.cameras.main.setBounds(0, 0, 3840, 1080);
            this.cameras.main.startFollow(this.player, true, 1, 1, deadzone, deadzone);
        }
    
        createPortal(x, y) {
        this.portal = this.physics.add.sprite(x, y, 'portal').setImmovable(true).setScale(0.3);
        this.portal.body.allowGravity = false;
    
        this.physics.add.overlap(this.player, this.portal, () => {
            // Передаем текущую громкость и сохраняем ее в реестре
            this.registry.set('musicVolume', this.musicVolume); 
            // Запускаем следующую сцену, передавая данные
            this.scene.start('GameScene2', { musicVolume: this.musicVolume }); 
            this.music_game.stop(); // Останавливаем музыку
        });
    
    }
        
    createGirl(x, y) {
        this.girl = this.physics.add.sprite(x, y, 'girl').setImmovable(false);
        this.portal.body.allowGravity = false;
        this.physics.add.collider(this.girl, this.platforms);
    
        this.physics.add.overlap(this.player, this.girl, () => {
            // Передаем текущую громкость и сохраняем ее в реестре
            this.registry.set('musicVolume', this.musicVolume); 
            // Запускаем следующую сцену, передавая данные
            this.scene.start('Menu', { musicVolume: this.musicVolume }); 
            this.scene.stop();
            this.music_game.stop(); // Останавливаем музыку
        });
    }
    
        destroy() {
          this.player.destroy();
          this.platforms.destroy(true);
          this.enemies.destroy(true);
          this.surikenGroup.destroy(true);
          this.portal.destroy(true);
        }
    
        update() {
            if (this.gameOver) return;
           let moving = false;
            if (this.cursors.left.isDown) {
              this.player.setVelocityX(-160);
              this.player.anims.play('left', true);
              this.lastDirection = -1;
              moving = true;
          } else if (this.cursors.right.isDown) {
              this.player.setVelocityX(160);
              this.player.anims.play('right', true);
              this.lastDirection = 1;
              moving = true;
          } else {
              this.player.setVelocityX(0);
          }
           
          // Проигрываем анимацию "стоя" только если игрок не двигался
          if (!moving) {
              if (this.lastDirection === 1) {
                  this.player.anims.play('turnright', true);
              } else {
                  this.player.anims.play('turnleft', true);
              }
          }
          // Прыжок(двойной)
          if (this.cursors.up.isDown && !this.jumpPressed && this.jumpsRemaining > 0) {
              this.player.setVelocityY(-300);
              this.jumpsRemaining--;
              this.jumpPressed = true; 
          }
          
           if (this.cursors.up.isUp) {
               this.jumpPressed = false;
           }
          
          if (this.player.body.touching.down) {
              this.jumpsRemaining = 2;
              this.jumpPressed = false; // Сбрасываем флаг только при приземлении
          }
            this.enemies.children.iterate((enemy) => { this.updateEnemy(enemy); });
        }
    createMusic() {
        this.music_game = this.sound.add('music_game');
        this.music_game.loop = true;
        this.music_game.play();
        this.musicVolume = this.registry.get('musicVolume') || 1; // Установите сохраненное значение громкости
    }
        resumeMusic() {
            if (this.music_game) {
             this.music_game.resume()
           }
        }
        getMusicVolume() {
            return this.musicVolume;
        }
        setMusicVolume(volume) {
        this.musicVolume = volume;
        if (this.music_game) {
            this.music_game.setVolume(this.musicVolume);
            console.log(`Громкость обновлена: ${volume}`);
        }
    }   
}
          

    