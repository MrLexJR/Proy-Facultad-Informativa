import React from 'react';
import { HdModal } from '../comp/MyLayout'
import { Entity, Scene } from 'aframe-react';

export default class extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         appRendered: false,
         color: 'red',
         modal: false, selectAmb: '' ,                         // variables del Modal y de la info del docente y aula 
         activeTab: '1',                                 // Variable del navTab en la info del aula
      }
      this.toggle = this.toggle.bind(this);
      this.tab_toggle = this.tab_toggle.bind(this);
   }

   toggle(e) {
      this.setState(prevState => ({
         modal: !prevState.modal,
         selectAmb: event.target.text || event.target.id
      }));
   }

   tab_toggle(tab) {
      if (this.state.activeTab !== tab) {
         this.setState({
            activeTab: tab
         });
      }
   }
   componentDidMount() {
      if (typeof window !== 'undefined') {
         require('aframe')
         require('aframe-particle-system-component')
         this.setState({ appRendered: true })
      }
   }

   render() {
      return (
         <div style={{ height: '100%', width: '100%' }} >
            <HdModal state={this.state} toggle={this.toggle} tab_toggle={this.tab_toggle} />
            {this.state.appRendered &&
               <a-scene embedded style={{ display: 'block' }} >
                  {/* <a-camera listener id='camara-3d' wasd-controls="acceleration: 1000" ></a-camera> */}
                  <a-assets>
                     <a-asset-item id="tree-obj" src="/static/obj-3D/PRUEBA.obj"></a-asset-item>
                     <a-asset-item id="tree-mtl" src="/static/obj-3D/PRUEBA.mtl"></a-asset-item>
                  </a-assets>
                  <a-sky color="#ECECEC"></a-sky>
                  <Entity id="Aula-111" 
                     geometry={{ primitive: 'box',  width: 100, height:50 }}
                     material={{ color: 'white'}}
                     position={{x: 75, y: 65, z: -380}} //-520
                     events={{ click: this.toggle }}>
                     <Entity text={{value: 'Aula 106', width: 500, align: 'center', color:'blue'}}  />
                  </Entity>
                  <a-obj-model position="-3500 -150 -1000" src="#tree-obj" mtl="#tree-mtl"></a-obj-model>
                  <Entity primitive="a-camera" wasd-controls="acceleration: 7000">
                     <Entity primitive="a-cursor" animation__click={{ property: 'scale', startEvents: 'click', from: '0.1 0.1 0.1', to: '1 1 1', dur: 150 }} />
                  </Entity>
               </a-scene>
            }
         </div>
      )
   }
}