import React from 'react'
import MapContext from '../Context'
import './ZoomControl.css'

class ZoomControl extends React.Component{

   state = { 
      zoomInDisabled: null,
      zoomOutDisabled: null
   }

   zoomIn = (e, map) => {
      e.preventDefault()
      map.setZoom(map.getZoom() + 1)
   }

   zoomOut = (e, map) => {
      e.preventDefault()
      map.setZoom(map.getZoom() - 1)
   }


   render() {
      return (
         <MapContext.Consumer>
            { ({ map }) => {

               const max = map.options.maxZoom ? map.options.maxZoom : 18
               const min = map.options.minZoom ? map.options.minZoom : 0

               map.once('zoomend', () => {

                  this.setState({
                     zoomInDisabled: map.getZoom() >= max ? 'leaflet-disabled' : '',
                     zoomOutDisabled: map.getZoom() <= min ? 'leaflet-disabled' : ''
                  })
                  
               })

               return(
                  <div className="leaflet-control-zoom leaflet-bar leaflet-control">
                     <a className={`leaflet-control-zoom-in ${this.state.zoomInDisabled}`} 
                        href="/" 
                        title="Zoom in" 
                        role="button" 
                        aria-label="Zoom in"
                        onClick={(e) => this.zoomIn(e, map)} >+</a>
                     <a className={`leaflet-control-zoom-out ${this.state.zoomOutDisabled}`} 
                        href="/" 
                        title="Zoom out" 
                        role="button" 
                        aria-label="Zoom out"
                        onClick={(e) => this.zoomOut(e, map)} >−</a>
                  </div>
            )}}
         </MapContext.Consumer>
         
      )
   }
}

export default ZoomControl

