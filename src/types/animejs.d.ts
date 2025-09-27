declare module 'animejs' {
  import { AnimeInstance, AnimeParams } from 'animejs/types/interface';
  function anime(params?: AnimeParams): AnimeInstance;
  namespace anime {}
  export = anime;
  // Provide a synthetic default for ES import * as / default interop patterns
  export default anime;
}

// ESM build path used by Vite for proper default export
declare module 'animejs/lib/anime.es.js' {
  import { AnimeInstance, AnimeParams } from 'animejs/types/interface';
  function anime(params?: AnimeParams): AnimeInstance;
  export default anime;
  export * from 'animejs';
}
