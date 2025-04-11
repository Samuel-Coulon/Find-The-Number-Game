const app = Vue.createApp({
  data() {
    const min = -50;
    const max = 50;
    return {
      random_number: Math.floor(Math.random() * (max - min + 1)) + min,
      guess: 0,
      timer_id: null,
      attempts: 0,
      showGuess: true,
    };
  },
  mounted() {
    this.startRandomizing();
  },
  watch: {
    guess(value) {
      if (value === this.random_number && value !== 0) {
        if (this.timer_id) {
          clearInterval(this.timer_id);
        }
        return;
      }
    },
  },
  computed: {
    hidden_number() {
      if (this.guess > this.random_number) return "That's too much!";
      if (this.guess < this.random_number) return "Need more than that!";
      return `You win! The hidden number was ${this.random_number}`;
    },
    has_won() {
      return this.guess === this.random_number && this.guess !== 0;
    },
  },
  methods: {
    add(num) {
      this.guess += num;
    },
    sub(num) {
      this.guess -= num;
    },
    resetGame() {
      const min = -50;
      const max = 50;
      this.random_number = Math.floor(Math.random() * (max - min + 1)) + min;
      this.guess = 0;
      this.attempts = 0;

      if (this.timer_id) {
        clearInterval(this.timer_id);
        this.timer_id = null;
      }

      this.startRandomizing();
    },
    startRandomizing() {
      const min = -50;
      const max = 50;

      this.timer_id = setInterval(() => {
        const old_number = this.random_number;
        let new_number;
        do {
          new_number = Math.floor(Math.random() * (max - min + 1)) + min;
        } while (Math.abs(new_number - old_number) < 21);

        this.random_number = new_number;
        this.attempts++;
      }, 10000);
    },
  },
});

app.mount("#find_the_number_game");
