class GameScene extends BaseGameScene {
        constructor() {
            super('Game');
        }
        
        preload() {
            super.preload();
            this.load.image('fon', 'assets/fon.jpg');
        }
    
        create() {
            this.score = 0;
            super.create(); // Вызываем create из базового класса
            // ... остальной ваш код ...
            this.musicVolume = this.registry.get('musicVolume') || 1; // Загружаем громкость
            this.setMusicVolume(this.musicVolume); // Устанавливаем громкость
            const background = this.add.image(0, 0, 'fon').setOrigin(0, 0);
            background.displayWidth = 3840;
            background.displayHeight = 1080;
            //инструкция
            this.instructionsText1 = this.add.text(200,400,"Управление:\nW - прыжок\nWx2 - двойной прыжок\nA - влево\nD - вправо",
                {
                    fontSize: '32px Arial',
                    fill: '#ffffff',
                    align: 'center',
                    stroke: '#000000',
                    strokeThickness: 2, 
                }
            ).setOrigin(0.5);
        
            this.tweens.add({
                targets: this.instructionsText1, // Используем this.instructionsText
                alpha: { from: 1, to: 0 },
                duration: 2000,
                delay: 8000,
                onComplete: () => { this.instructionsText1.destroy(); } // Используем this.instructionsText
            });
        
            this.instructionsText2= this.add.text(450,400,"SPACE - атака\n ESC - пауза",
                {
                    fontSize: '32px Arial',
                    fill: '#ffffff',
                    align: 'center',
                    stroke: '#000000',
                    strokeThickness: 2, 
                }
            ).setOrigin(0.5);
        
            this.tweens.add({
                targets: this.instructionsText2, // Используем this.instructionsText
                alpha: { from: 1, to: 0 },
                duration: 2000,
                delay: 8000,
                onComplete: () => { this.instructionsText2.destroy(); } // Используем this.instructionsText
            });
      
    
            this.createPlatforms(60,850);
            this.createPlatforms(180,900);
            this.createPlatforms(300, 900);
            this.createPlatforms(420, 1000);
            this.createPlatforms(540, 1000);
            this.createPlatforms(660, 950);
            this.createPlatforms(660, 950); 
            this.createPlatforms(780, 950);
            this.createPlatforms(900, 950);
            this.createPlatforms(1020, 1000);
            this.createPlatforms(1140, 900);
            this.createPlatforms(1260, 800);
            this.createPlatforms(1380, 1100);
            this.createPlatforms(1500, 1100);
            this.createPlatforms(1620, 1100);
            this.createPlatforms(1740, 1000);
            this.createPlatforms(1860, 950);
            this.createPlatforms(1980, 900);
            this.createPlatforms(2100, 850);
            this.createPlatforms(2220, 950);
            this.createPlatforms(2340, 950);
            this.createPlatforms(2460, 950);
            this.createPlatforms(2570, 900);
            this.createPlatforms(2690, 900);
            this.createPlatforms(2810, 900);
            this.createPlatforms(2920, 900);
            this.createPlatforms(3040, 900);
            this.createPlatforms(3160, 950);
            this.createPlatforms(3280, 950);
            this.createPlatforms(3400, 1000);
            this.createPlatforms(3520, 1100);
            this.createPlatforms(3640, 1100);
            this.createPlatforms(3760, 1100);

            
            this.createScoreText();
    
            this.createPlayer();
            
            this.createEnemy(700, 500, 50, -50); 
            this.createEnemy(1000, 500, -50, 50);
            this.createEnemy(1300, 500, -50, 50);
            this.createEnemy(1500, 500, 50, -50); 
            this.createEnemy(2100, 500, -50, 50);
            this.createEnemy(2400, 500, 50, -50); 
            this.createEnemy(2800, 500, -50, 50);
            this.createEnemy(3100, 500, 50, -50); 
            this.createEnemy(3500, 500, -50, 50);
            
            this.createSurikens();
            this.createCamera();
            this.createPortal(3800, 800); // Портал в конце первого уровня
            // ... другая логика уровня 1 ...
        }
    }