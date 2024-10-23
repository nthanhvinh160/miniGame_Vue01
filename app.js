

function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Create a new Vue instance
new Vue({
  el: '#app', // Mount the Vue instance to the HTML element with id 'app'
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
      isAttack: false, // animate for User
      isAttacked: false, // animate for Monster
      isActiveBubble: false, // animate Heal
      isBigger: false, // animate Sword appearance
      isSlide: false, // animate Sword flying
      isAppear: false, // animate Fire-Ball appearance
      isFire: false, // Monster fire attack
      isUserDamaged: false, // activate user damage skill image
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
      this.round = 0;
    },
    userAttack() {
      this.round++;
      this.isFighting = true;
      this.userDamage = getRandomValue(5, 10);
      this.monsterHeart -= this.userDamage;
      console.log("user: " + this.userDamage);
      this.isAttack = true; // user attacking
      this.isAttacked = false; // monster being attacked
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
      this.isAttack = false; // user attacking
      this.isAttacked = true; // monster being attacked
    },
    userBuff() {
      this.round++;
      this.healHeart = getRandomValue(15, 25);
      this.isActiveBubble = true;  // Start Heal animation
      setTimeout(() => {
        this.isActiveBubble = false; // End Heal animation
      }, 1000);

      // Only heal if userHeart is less than 100
      if (this.userHeart < 100) {

        // Check again if the heal would push userHeart beyond 100
        if (this.userHeart + this.healHeart > 100) {
          this.userHeart = 100;
        } else {
          this.userHeart += this.healHeart;
          console.log("heal: " + this.healHeart);
        }

      }

      this.healAnimate = false;
      setTimeout(() => {

        this.healAnimate = true;
      }, 200);
    },

    specialAttackMonster() {
      this.round++;
      this.isFighting = true;
      this.userDamage = getRandomValue(20, 30);
      this.monsterHeart -= this.userDamage;

      this.animate = false;
      this.specialAttackAnimationForUser();

      setTimeout(() => {

        this.animate = true;
        this.isFighting = false;
        this.isAttack = false; // user attacking
        this.isAttacked = true; // monster being attacked
        setTimeout(() => {
          this.specialAttackAnimationForMonster();

          this.monsterDamage = getRandomValue(10, 20);
          this.userHeart -= this.monsterDamage;
        }

          , 1000);
      }, 1290);

    },

    surrender() {
      this.userHeart = 0;
    },
    specialAttackAnimationForUser() {
      this.isBigger = true;
      setTimeout(() => { this.isBigger = false }, 2000);
      setTimeout(() => { this.isAttack = true }, 900);
      setTimeout(() => { this.isAttack = false }, 2000);
      this.isSlide = true;
    },
    specialAttackAnimationForMonster() {
      this.isAppear = true;
      setTimeout(() => { this.isFire = true }, 50);
      setTimeout(() => { this.isAppear = false }, 1800);
      setTimeout(() => { this.isUserDamaged = true }, 1500);
      setTimeout(() => { this.isUserDamaged = false }, 2200);
    },
    startGame(e) {
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
      // Special attack enabled only if user's health drops below 50%
      return this.userHeart < 70;
    },
    handleEnd1() {
      if (this.monsterHeart <= 0) {
        this.monsterHeart = 0;
        return true;
      }
      return false;
    },
    handleEnd2() {
      if (this.userHeart <= 0) {
        this.userHeart = 0;
        return true;
      }
      return false;
    },
    handleBtn() {
      return this.userHeart > 0 && this.monsterHeart > 0;
    },
  },
});
