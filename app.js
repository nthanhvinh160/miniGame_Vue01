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
      isFighting: false,
      animate: false,
      isAttack: false, // animate cho User
      isAttacked: false, // animate cho Quai Vat
      isActiveBubble: false, // animate Heal
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
      this.healHeart = getRandomValue(10,20);
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
      this.animate = true;
      setTimeout(() => {
        this.monsterAttack();
      }, 200);
    },
    specialAttackMonster() {
      this.round++;
      const attackValue = getRandomValue(15, 30);
      this.monsterHeart -= attackValue;
      this.isFighting = true;
      setTimeout(() => {
        this.monsterAttack();
      }, 200);
    },
    surrender() {
      this.userHeart = 0;
    },
    startGame(e){
      this.styleOverlayTop.left = '-100%';
      this.styleOverlayBottom.right = '-100%';
      this.styleStartTop.left = '-42.09%';
      this.styleStartBottom.right = '-42.09%';
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
