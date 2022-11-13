import MetricRandom from "sensen-metric-random";

export type IStyleDefault =  'unset' | 'initial'

export interface IStyleDeclaration extends Partial<CSSStyleDeclaration>{

  display ?: 'flex' | 'grid' | 'inline' | 'inline-block' | 'block' | 'none' | IStyleDefault | undefined;

  flexDirection ?: 'column' | 'column-reverse' | 'row' | 'row-reverse' | IStyleDefault

  backdropFilter ?: string;
  
}

export type ISensenVisualKitCanvas = {

  [ X : string ] : HTMLStyleElement
  
}

export class VisualKitStyle{

  static toPropertyName( value : string ){

    return value.replace( /([A-Z])/g, `-$&`).toLowerCase();
  
  }

  static fromPropertyName( value : string ){

    return value.replace( /(?:^\w|[A-Z]|\b\w)/g, (text, index) =>

      index === 0 ? text.toLowerCase() : text.toUpperCase()
      
    ).replace( /\s+/g, '' );

  }

  static parse( structure : IStyleDeclaration ){

    return Object.entries( structure || {} ).map( e =>{

      return `${ 
          
          this.parseProperty(e[0]) 
      
      }:${ 
          
          this.parseValue(e[1]) 
      
      };`
        
    }) as Array<string>

  }
  

  static parseProperty( property : string ){

    return this.toPropertyName( property )
      
  }

  static parseValue( value : string ){

    return value;
      
  }
  
}


export class SensenVisualKit{


  name : string = '';

  #element : HTMLElement | null = null;

  #canvas : ISensenVisualKitCanvas = {};

  #reposiroty : HTMLHeadElement | null = null;

  declarations : VisualKitDeclaration = new VisualKitDeclaration();
  
  property : VisualKitProperty;


  get target(){ return this.#element; }

  constructor( element : HTMLElement | null ){

    this.#element = element;

    this.#reposiroty = document.head;
    
    this.name = MetricRandom.CreateAplpha( 16 ).join('')

    this.property = new VisualKitProperty( element );

  }

  define( declaration : IStyleDeclaration ){

    this.declarations.define( declaration )

    return this;

  }

  use( name ?: string ){

    this.name = name || this.name;

    this.#mount( this.name, this.declarations )
    
    return this;
    
  }
  
  #mount( name: string, declarations : VisualKitDeclaration ){

    this.#canvas[ name ] = this.#canvas[ name ] || document.createElement('style');

    if( this.#canvas ){

      this.#canvas[ name ].innerHTML = ( `[visual-kit~="${ name }"] { ${ declarations.value.join(' ') } }` )

      this.property.sync().add( name ).link()

    }
    
    this.#canvas[ name ].setAttribute('visualkit:canvas', `${ name }`)

    return this.append( name );
    
  }
  
  append( name ?: string ){

    this.#reposiroty?.append( this.#canvas[ name || this.name ] );

    return this;
    
  }

  sheet( sheet : Kit ){

    this.#mount( sheet.name, sheet.declarations )
    
    return this;
    
  }

}


export class VisualKitDeclaration{

  #entries : IStyleDeclaration = {};
  
  get value(){ return VisualKitStyle.parse( this.#entries ); }

  define( declaration : IStyleDeclaration ){

    this.#entries = { ...this.#entries, ...declaration };

    return this;
    
  }
  
  remove( property : string ){

    let clone : IStyleDeclaration = {};

    Object.entries( this.#entries ).map( ({ 0: name, 1: value }) => {

      if( name != property ){

        clone = { ...clone, ...{ name : value} }
        
      }
      
    } );

    this.#entries = clone;

    return this;
    
  }

  replace( older : string, value : string ){

    return this.remove( older ).define( value )
    
  }

  contains( property : string ){

    let found : boolean = false;

    Object.entries( this.#entries ).map( ({ 0: name }) => {

      if( name == property ){ found = true; }
      
    } );

    return found

  }
  
  
}



export class VisualKitProperty{

  #entries : string[] = [];
  
  #element : HTMLElement | null = null;

  get codex(){ return 'visual-kit' }

  get payload(){ return this.#entries; }

  get value(){ return this.#entries.join(' '); }

  constructor( element : HTMLElement | null ){

    this.#element = element;

    this.sync()
    
  }

  sync(){

    (this.#element?.getAttribute(`${ this.codex }`)||'').split(' ')

    .map( value => this.add(`${ value.trim() }`))

    return this;
    
  }

  add( value : string ){

    if( !this.contains( value ) ){

      this.#entries.push( value )

    }

    return this;
    
  }
  
  remove( value : string ){

    this.#entries = this.#entries.filter( entry => entry != value );

    return this;
    
  }

  replace( older : string, value : string ){

    return this.remove( older ).add( value )
    
  }

  contains( value : string ){

    return this.#entries.includes( value, 0 )
    
  }
  
  link(){

    this.#element?.setAttribute( this.codex , `${ this.value }`)

    return this;

  }
  
  unlink( property ?: string | string[] ){

    if( property ){
      
      if( Array.isArray( property ) ){ property.map( prop => this.remove( prop ) ); }

      this.#element?.setAttribute( this.codex , `${ this.value }`)

    }

    else{

      this.#element?.removeAttribute( this.codex  )
      
    }

    return this;

  }

}


export class Kit{

  name : string = '';

  declarations : VisualKitDeclaration = new VisualKitDeclaration();

  constructor( name : string, declarations ?: IStyleDeclaration ){

    this.name = name;

    this.declarations.define( declarations || {} );
    
  }
  
}


export default function useVisualKit( element : HTMLElement | null ){

  return new SensenVisualKit( element )

}
