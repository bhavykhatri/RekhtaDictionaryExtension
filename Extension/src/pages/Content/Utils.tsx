export namespace Utils{
  export interface IAPIResponse{
    origin: string;
    vazn: string;
    meaningByLanguage: IHash;
  }

  interface IHash{
    [language: string]: IWordMeaning;
  }

  interface IWordMeaning{
    partOfSpeech: string[];
    description: string[];
    word: string;
  }

  export function ResponseProcessor(response: IAPIResponse){
    console.log(response.origin);
  }
}