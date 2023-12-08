export class Fullscreen {
  get isFullscreen(): boolean {
    return document.fullscreenElement !== null;
  }

  fullscreen(element?: HTMLElement): Promise<void> {
    element = element || document.documentElement;
    return new Promise((resolve, reject) => {
      if (this.isFullscreen) {
        resolve();
      } else {
        (element as HTMLElement).requestFullscreen().then(() => {
          resolve();
        }, (error) => {
          reject(error);
        });
      }
    });
  }

  exitFullscreen(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.isFullscreen) {
        document.exitFullscreen().then(() => {
          resolve();
        }, (error) => {
          reject(error);
        });
      } else {
        resolve();
      }
    });
  }
}

export default new Fullscreen();
