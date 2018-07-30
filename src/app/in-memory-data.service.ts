import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroIcons = [
      { heroName: 'Ana', xPosition: 0, yPosition: 0, src: "https://d1u5p3l4wpay3k.cloudfront.net/overwatch_gamepedia/3/3d/Icon-Ana.png?version=222d1490aa0dcce979959877143efd4c", id: 0 },
      { heroName: 'Lucio', xPosition: 0, yPosition: 0, src: "https://d1u5p3l4wpay3k.cloudfront.net/overwatch_gamepedia/5/51/Icon-L%C3%BAcio.png?version=1f6ad7b0e88853a4e97e12a8ccfe0d6f", id: 1 },
      { heroName: 'Zenyatta', xPosition: 0, yPosition: 0, src: "https://d1u5p3l4wpay3k.cloudfront.net/overwatch_gamepedia/f/f7/Icon-Zenyatta.png?version=5b7b86317ba00765786f8428444d8e32", id: 2 }
    ];
    return {heroIcons};
  }
}

