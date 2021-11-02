function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      userHeart: 100,
      monsterHeart: 100,
      userDamage: 0,
      monsterDamage: 0,
      healHeart: 0,
      round: 0,
      healAnimate: false,
      isFighting: false,
      animate: false,
      isAttack: false, // animate cho User
      isAttacked: false, // animate cho Quai Vat
      isActiveBubble: false, // animate Heal
      isBigger: false, // animate Kiem xuat hien
      isSlide: false, // animate Kiem bay
      isAppear: false, // animate Fire-Ball xuat hien
      isFire: false, // Quai vat khac lua
      isUserDameged: false, // kich hoat hinh anh nguoi trung skill
      styleStartTop: {
        left: '',
      },
      styleOverlayTop: {
        left: '',
      },
      styleStartBottom: {
        right: '',
      },
      styleOverlayBottom: {
        right: '',
      },
    };
  },
  methods: {
    startNewGame() {
      this.userHeart = 100;
      this.monsterHeart = 100;
      this.winner = null;
      this.round = 0;
    },
    userAttack() {
      this.round++;
      this.isFighting = true;
      this.userDamage = getRandomValue(5, 10);
      this.monsterHeart -= this.userDamage;
      console.log("user: " + this.userDamage);
      this.isAttack = true; // nhan vat tan cong
      this.isAttacked = false; // trang thai quai vat bi. tan cong
      this.animate = false;
      setTimeout(() => {
        this.monsterAttack();
      }, 600);
    },
    monsterAttack() {
      this.monsterDamage = getRandomValue(10, 20);
      console.log("monster: " + this.monsterDamage);
      this.animate = true;
      this.userHeart -= this.monsterDamage;
      this.isFighting = false;
      this.isAttack = false; // nhan vat tan cong
      this.isAttacked = true; // trang thai quai vat bi. tan cong
    },
    userBuff() {
      this.round++;
      this.healHeart = getRandomValue(15,25);
      this.isActiveBubble = true;  //Bat animation Heal
      setTimeout(() => {
        this.isActiveBubble = false;
      },1000); //Tat animation Heal
      if(this.userHeart + this.healHeart > 100) {
        this.userHeart = 100;
      } else {
        setTimeout(() => {
          this.userHeart += this.healHeart;
          console.log("heal: " + this.healHeart);
        }, 500);
      }
      this.healAnimate = false;
      setTimeout(() => {
        this.monsterAttack();
        this.healAnimate = true;
      }, 200);
    },
    specialAttackMonster() {
      this.round++;
      this.isFighting = true;
      this.userDamage = getRandomValue(15, 30);
      this.monsterHeart -= this.userDamage;
      console.log("user: " + this.userDamage);
      this.animate = false;
      this.specialAttackAnimationForUser();
     
      setTimeout(() => {
        this.monsterAttack();
        setTimeout(() => {this.specialAttackAnimationForMonster();},1000);
      }, 1290);
    },
    surrender() {
      this.userHeart = 0;
    },
    specialAttackAnimationForUser(){
      this.isBigger = true;
      setTimeout(() => {this.isBigger = false},2000)
      setTimeout(() => {this.isAttack = true},900)
      setTimeout(() => {this.isAttack = false},2000)
      this.isSlide = true;
    },
    specialAttackAnimationForMonster(){
      this.isAppear = true;
      setTimeout(() => {this.isFire = true}, 50)
      setTimeout(() => {this.isAppear = false}, 1800)     
      setTimeout(() => {this.isUserDameged = true},1500)
      setTimeout(() => {this.isUserDameged = false},2200)
    },
    startGame(e){
      this.styleOverlayTop.left = '-100%';
      this.styleOverlayBottom.right = '-100%';
      this.styleStartTop.left = '-100%';
      this.styleStartBottom.right = '-100%';
    },
  },
  computed: {
    canUseBuff() {
      return this.round < 1;
    },
    canUseSpecialAttack() {
      return this.round % 3 !== 0;
    },
    headleEnd1() {
      if (this.monsterHeart <= 0) {
        this.monsterHeart = 0;
        return true;
      }
      return false;
    },
    headleEnd2() {
      if (this.userHeart <= 0) {
        this.userHeart = 0;
        return true;
      }
      return false;
    },
    handlebtn() {
      if (this.userHeart <= 0 || this.monsterHeart <= 0) {
        return false;
      } else {
        return true;
      }
    },
  },
});

app.mount("#app");
