class GameScene2 extends BaseGameScene {
        constructor() {
            super('GameScene2');
        }
        preload() {
            super.preload();
            this.load.image('fon', 'assets/fon.jpg');
        }
        init(){
           this.score = parseInt(localStorage.getItem('score') || '0', 10); 
        //    this.musicVolume = this.registry.get('musicVolume');// Установите громкость из реестра
        }
    
        create() {
        super.create(); // Вызываем create из базового класса
        this.musicVolume = this.registry.get('musicVolume') || 1; // Загружаем громкость
        this.setMusicVolume(this.musicVolume); // Устанавливаем громкость
        
            
            const background = this.add.image(0, 0, 'fon').setOrigin(0, 0);
            background.displayWidth = 3840;
            background.displayHeight = 1080;
            this.instructionsText3 = this.add.text(3700, 400,"Поздравляем!\nТы победил!",
                {
                fontSize: '32px Arial',
                fill: '#ffffff',
                align: 'center',
                stroke: '#000000',
                strokeThickness: 2, 
                }).setOrigin(0.5);
    
            this.createPlatforms(60,900);
            this.createPlatforms(180,1000);
            this.createPlatforms(300, 1100);
            this.createPlatforms(420, 1100);
            this.createPlatforms(540, 1200);
            this.createPlatforms(660, 1050);
            this.createPlatforms(780, 1050);
            this.createPlatforms(900, 1000);
            this.createPlatforms(1020, 900);
            this.createPlatforms(1140, 1100);
            this.createPlatforms(1260, 1100);
            this.createPlatforms(1380, 1500);
            this.createPlatforms(1500, 1150);
            this.createPlatforms(1620, 1150);
            this.createPlatforms(1740, 1150);
            this.createPlatforms(1860, 1150);
            this.createPlatforms(1980, 1000);
            this.createPlatforms(2100, 1250);
            this.createPlatforms(2220, 1250);
            this.createPlatforms(2340, 1250);
            this.createPlatforms(2460, 1250);
            this.createPlatforms(2570, 1200);
            this.createPlatforms(2690, 1200);
            this.createPlatforms(2810, 1250);
            this.createPlatforms(2920, 1250);
            this.createPlatforms(3040, 1150);
            this.createPlatforms(3160, 1150);
            this.createPlatforms(3280, 1150);
            this.createPlatforms(3400, 1000);
            this.createPlatforms(3520, 1000);
            this.createPlatforms(3640, 900);
            this.createPlatforms(3760, 900);

            this.setMusicVolume(this.musicVolume);
            this.createScoreText();
    
            this.createPlayer();
            
            this.createEnemy(700, 500, 50, -50); 
            this.createEnemy(1000, 500, -50, 50);
            this.createEnemy(1300, 500, -50, 50);
            //this.createEnemy(1550, 500, -50, 50);
            this.createEnemy(1650, 500, -50, 50);
            //this.createEnemy(1950, 500, -50, 50);
            
            this.createEnemy(2300, 500, -50, 50);
            this.createEnemy(2600, 500, -50, 50);
            this.createEnemy(2900, 500, -50, 50);
            this.createEnemy(3200, 500, -50, 50);
            this.createEnemy(3600, 500, -50, 50);
            this.createGirl(3700,300);

            this.createSurikens();
            this.createCamera();

            
        }
    
    }
    
    
    