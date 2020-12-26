export class MediaSetting {
  constructor(player) {
    this.player = player;
  }
  addZero = (n) => {
    if (n < 10) {
      return `0${n}`;
    }
    return n;
  };

  volumeControl = (player, volume) => {
    player.volume = volume.value / 100;
  };
}
