
import VisualKit, { Kit } from "./index"

const element = document.querySelector<HTMLElement>('#sandbox')

// const title = document.querySelector<HTMLElement>('#sandbox h1')


const visualKit = VisualKit( element ).define({
 
  backgroundColor:'#777',
 
  color:'#444',
 
  padding:'2rem'

}).use('my-sample')


const sheet = new Kit('layer', {

  borderRadius: '1rem',

  boxShadow: '0 0 2rem rgba(0,0,0,.07)'

})

visualKit.sheet( sheet )

console.log('VisualKit', visualKit )
