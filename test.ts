
import useVisualKit, { Kit } from "./index"

const element = document.querySelector<HTMLElement>('#sandbox')

// const title = document.querySelector<HTMLElement>('#sandbox h1')


const visualKit = useVisualKit( element ).define({
 
  backgroundColor:'#777',
 
  color:'#444',
 
  padding:'2rem',

  margin: "3rem",

}).use('my-sample')


const sheet = new Kit('layer', {

  borderRadius: '1rem',

  boxShadow: '0 0 2rem rgba(0,0,0, .6)'

})

const sheet2 = new Kit('layer2', {

  backgroundColor:'#cacaca',

  boxShadow: '0 0 2rem rgba(0,0,0,.6)'

})

visualKit.sheet( sheet )

visualKit.sheet( sheet2 )

console.log('VisualKit', visualKit )
