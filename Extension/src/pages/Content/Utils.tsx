export namespace Utils{
  export interface IAPIResponse{
    origin: string;
    vazn: string;
    meaningByLang: IHash;
  }

  interface IHash{
    [language: string]: IWordMeaning;
  }

  interface IWordMeaning{
    partOfSpeech: string[];
    description: string[];
  }
}