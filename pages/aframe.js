import React from 'react';
import { HdModal } from '../comp/MyLayout'
import { Entity } from 'aframe-react'
import $ from 'jquery'

export default class extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         modal: false, selectAmb: '',                         // variables del Modal y de la info del docente y aula 
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

   myFunctionid(comp) {
      let id = comp.id;
      alert(id);
   }

   escribir(cod, x, y, z) {
      $(document).ready(function () {
         var sceneEl = document.querySelector('#c');
         var entityEl = document.createElement('a-entity');
         entityEl.setAttribute('material', 'color', 'lightgrey');
         entityEl.setAttribute('geometry', { primitive: "plane", height: "1.5", width: "3" });
         entityEl.setAttribute('position', { x: x, y: y, z: z });
         entityEl.setAttribute('click', this.toggle);
         entityEl.setAttribute('name', cod);
         entityEl.setAttribute('id', cod);
         entityEl.setAttribute('text', 'value', cod);
         entityEl.setAttribute('text', 'align', 'center');
         entityEl.setAttribute('text', 'width', '30');
         entityEl.setAttribute('text', 'color', '#000000');
         entityEl.setAttribute('scale', '0.1 0.1 0.1');
         //  ROTACION A LAS ETIQUETAS TRASERAS
         if (cod == "118" || cod == "119" || cod == "120" || cod == "121" || cod == "122" || cod == "123" || cod == "124" || cod == "125" || cod == "126") {
            entityEl.setAttribute('rotation', { x: 0, y: 180, z: 0 });
         }
         sceneEl.appendChild(entityEl);
      });
   }

   componentDidMount() {
      const y1 = 1.5;
      const z1 = 4.4;
      const z12 = -2.3;
      const y2 = 4.2;
      const z2 = 4.4;
      const y3 = 6.8;
      const z3 = 4.4;
      const etiquetas = [
         //primer piso
         this.escribir("101", -6.5, y1, z1),
         this.escribir("102", -0.4, y1, z1),
         this.escribir("103", 5.6, y1, z1),
         this.escribir("104", 10.11, y1, z1),
         this.escribir("105", 16.17, y1, z1),
         this.escribir("106", 22.3, y1, z1),
         this.escribir("107", 28.4, y1, z1),
         this.escribir("108", 32.8, y1, z1),
         this.escribir("109", 38.46, y1, z1),
         this.escribir("110", 39.6, y1, z1),
         this.escribir("111", 42, y1, z1),
         this.escribir("112", 44.54, y1, z1),
         this.escribir("113", 45.64, y1, z1),
         this.escribir("114", 48.24, y1, z1),
         this.escribir("115", 50.6, y1, z1),
         this.escribir("116", 51.7, y1, z1),
         this.escribir("117", 54.17, y1, z1),
         //primer piso parte trasera
         this.escribir("118", 38.1, y1, z12),
         this.escribir("119", 39.1, y1, z12),
         this.escribir("120", 41.5, y1, z12),
         this.escribir("121", 44.04, y1, z12),
         this.escribir("122", 45.14, y1, z12),
         this.escribir("123", 47.76, y1, z12),
         this.escribir("124", 50.4, y1, z12),
         this.escribir("125", 51.4, y1, z12),
         this.escribir("126", 54, y1, z12),


         //segundo  piso
         this.escribir("201", -6.5, y2, z2),
         this.escribir("202", -0.4, y2, z2),
         this.escribir("203", 5.6, y2, z2),
         this.escribir("204", 10.11, y2, z2),
         this.escribir("205", 16.17, y2, z2),
         this.escribir("206", 22.3, y2, z2),
         this.escribir("207", 32.8, y2, z2),
         this.escribir("208", 39.6, y2, z2),
         this.escribir("209", 51.7, y2, z2),

         //tercer  piso
         this.escribir("301", -6.5, y3, z3),
         this.escribir("302", -0.4, y3, z3),
         this.escribir("303", 5.6, y3, z3),
         this.escribir("304", 10.11, y3, z3),
         this.escribir("305", 16.17, y3, z3),
         this.escribir("306", 22.3, y3, z3),
         this.escribir("307", 32.8, y3, z3),
         this.escribir("308", 39.6, y3, z3),
         this.escribir("309", 43.38, y3, z3),
         this.escribir("310", 47, y3, z3),
         this.escribir("311", 48.2, y3, z3),
         this.escribir("312", 51.7, y3, z3),

      ];

      if (typeof window !== 'undefined') {
         require('aframe')
         require('aframe-particle-system-component')
         require('aframe-physics-system');
         require('aframe-extras');
         this.setState({ appRendered: true })
      }
      

      $(document).keydown(function (e) {
         e = e || window.event;
         var charCode = (typeof e.which == "number") ? e.which : e.keyCode;
         //PARA SALTAR
         if (e.which == 32) {
            var saltar = document.querySelector('[camera]').getAttribute('position');
            document.querySelector('[camera]').setAttribute('position', { x: saltar.x, y: saltar.y + 1, z: saltar.z });
         }
         //PARA RETORNAR
         if (e.which == 13) {
            document.querySelector('[camera]').setAttribute('position', { x: 22, y: 3, z: 15 });
         }

         if (charCode) {
            var cameraEl = document.querySelector('[camera]').getAttribute('position');
         }
      });
   }

   render() {
      return (
         // <body className="a-body">
         <div style={{ height: '100%', width: '100%' }} >
            <HdModal state={this.state} toggle={this.toggle} tab_toggle={this.tab_toggle} />
            <a href="#" onClick={this.toggle} >Aula 106</a>
            {this.state.appRendered &&
               <a-scene id="c" background="color: #FAFAFA" environment="preset: forest" embedded debug="" physics="debug: false"
                  canvas="" inspector="" keyboard-shortcuts="" screenshot="" vr-mode-ui="" auto-enter-vr="">
                  <a-assets> <img id="sky" src="/static/cielo.jpg" /> </a-assets>
                  {/* <Entity primitive="a-sky" src="#sky" rotation="0 -90 0"  />
                  <Entity primitive="a-light" type="point" color="#f4f4f4" intensity="0.4" position="8 100 18" />
                  <Entity primitive="a-light" type="point" color="#f4f4f4" intensity="0.8" position="8 100 18" />
                  <Entity primitive="a-light" type="ambient" color="#f4f4f4" intensity="0.6" position="8 100 18" /> */}

                  <a-sky src="#sky" rotation="0 -90 0"></a-sky>
                  <a-entity light="type: point; color: #f4f4f4; intensity: 0.4; distance: 0" position="8 100 18"></a-entity>
                  <a-entity light="type: point; color: #f4f4f4; intensity: 0.8; distance: 0" position="8 100 18"></a-entity>
                  <a-entity light="type: ambient; color: #f4f4f4; intensity: 0.6;" position="8 100 18"></a-entity>

                  <a-entity id="floor" static-body geometry="depth:80;height:0.2;width:200;"
                     material="repeat:500 200;coloass:0.1;src:https://ucarecdn.com/8a2780f7-e076-4f8c-bd1d-40ae172508a9/"
                     visible="true"></a-entity>

                  <a-entity id="flo" static-body geometry="depth:50;height:0.2;width:150;" position="0 -0.5 0" visible="false"></a-entity>
                  <a-entity id="floor2" static-body geometry="depth:2;height:0.2;width:71;" position="20 2.5 4.7" visible="false"></a-entity>
                  <a-entity id="floor3" static-body geometry="depth:2;height:0.2;width:71;" position="20 5 4.7" visible="false"></a-entity>

                  <a-box id="pared" width="0.1" height="8" depth="4" position="-13.5 5 2" visible="false" static-body></a-box>
                  <a-box id="pared" width="3.2" height="0.1" depth="0.5" position="-13.5 1.4 -1.1" visible="false" static-body></a-box>

                  <a-entity static-body geometry="depth:5;height:0.2;width:1.7;" rotation="18 0 0" position="-14.3 0.65 1" visible="false"></a-entity>
                  <a-entity static-body geometry="depth:6;height:0.2;width:2.5;" rotation="-16 0 0" position="-12.4 1.75 1" visible="false"></a-entity>
                  <a-entity static-body geometry="depth:6;height:0.2;width:1.8;" rotation="18 0 0" position="-14.3 3.5 1" visible="false"></a-entity>
                  <a-entity static-body geometry="depth:6;height:0.2;width:2.5;" rotation="-12 0 0" position="-12.4 4.4 1" visible="false"></a-entity>
                  <a-entity static-body geometry="depth:0.1;height:1;width:2;" rotation="0 0 0" position="-14.3 6 4.1 " visible="false"></a-entity>

                  <a-box id="pared" width="0.1" height="8" depth="4" position="8 4 2" visible="false" static-body></a-box>
                  <a-box id="pared" width="3" height="1" depth="0.1" position="8 0.5 4" visible="false" static-body></a-box>
                  <a-box id="pared" width="2" height="1" depth="0.1" position="9 5.5 4" visible="false" static-body></a-box>
                  <a-box id="sube" width="1.7" height="0.2" depth="5" rotation="18 0 0" position="8.9 0.65 1" visible="false" static-body></a-box>
                  <a-box id="sube1" width="2" height="0.2" depth="6" rotation="-16 0 0" position="7 1.75 1" visible="false" static-body></a-box>
                  <a-box id="sube2" width="1.8" height="0.2" depth="6" rotation="18 0 0" position="8.9 3.5 1" visible="false" static-body></a-box>
                  <a-box id="sube3" width="2" height="0.2" depth="6" rotation="-12 0 0" position="7 4.4 1" visible="false" static-body></a-box>

                  <a-box id="pared" width="0.1" height="8" depth="4" position="35 5 2" visible="false" static-body></a-box>
                  <a-box id="pared" width="3" height="1" depth="0.1" position="36.4 0.5 4.3" visible="false" static-body></a-box>
                  <a-box id="pared" width="2" height="1" depth="0.1" position="34.1 5.5 4" visible="false" static-body></a-box>
                  <a-box id="sube" width="1.7" height="0.2" depth="5" rotation="18 0 0" position="34.1 0.65 1" visible="false" static-body></a-box>
                  <a-box id="sube1" width="2.5" height="0.2" depth="6" rotation="-16 0 0" position="36.4 1.75 1" visible="false" static-body></a-box>
                  <a-box id="sube2" width="1.8" height="0.2" depth="6" rotation="18 0 0" position="34.1 3.5 1" visible="false" static-body></a-box>
                  <a-box id="sube3" width="2.5" height="0.2" depth="6" rotation="-12 0 0" position="36.4 4.4 1" visible="false" static-body></a-box>

                  <Entity id="player" listener health="200" userHeight="1.6" primitive="a-camera" wasd-controls="acceleration: 100"
                     position={{ x: 22, y: 1, z: 15 }} radius="30" rotation="0 0 0" look-controls="pointerLockEnabled: true" >
                     <Entity position={{ x: 0, y: 0, z: -0.5 }} primitive="a-cursor" animation__click={{ property: 'scale', startEvents: 'click', from: '0.1 0.1 0.1', to: '1 1 1', dur: 100 }} geometry="primitive:ring;radiusInner:0.01;radiusOuter:0.016"
                        material="opacity:0.5;shader:flat;transparent:true;color:#1822BE" scale="0.8 0.8 0.8" />
                  </Entity>

                  {/* <a-entity camera id="player" listener player="health: 200" userHeight="1.6"
                     universal-controls="movementAcceleration: 100;" position="22 3 15" kinematic-body="radius:0.5" rotation="0 0 0"
                     look-controls="pointerLockEnabled: true">
                     <a-entity cursor position="0 0 -0.5" geometry="primitive:ring;radiusInner:0.01;radiusOuter:0.016"
                        material="opacity:0.5;shader:flat;transparent:true;color:#1822BE" scale="0.8 0.8 0.8"></a-entity>
                  </a-entity> */}

                  <a-box id="wall_2" width="70" height="5.3" depth="0.1" position="20 5.3 5.5" visible="false" static-body></a-box>
                  <a-box id="pared al extremo" width="0.1" height="5.2" depth="2" position="54.9 5.3 5" visible="false" static-body></a-box>
                  <a-box id="pared baño" width="0.1" height="8" depth="7" position="-15 5 2" visible="false" static-body></a-box>
                  <a-box id="pered trasera" width="70" height="9.6" depth="0.1" position="20 5 -1.4" visible="false" static-body></a-box>

                  <a-box id="bloque 1" width="18.8" height="8" depth="6.5" position="-2.7 4 1.1" visible="false" static-body></a-box>
                  <a-box id="bloque 2" width="24.5" height="8" depth="6.5" position="21.5 4 1.1" visible="false" static-body></a-box>
                  <a-box id="bloque 3" width="18.8" height="8" depth="6.5" position="45.6 4 1.1" visible="false" static-body></a-box>
                  <a-box id="bloque baño" width="4" height="3" depth="6.5" position="-19.13 1.5 1.1" visible="false" static-body>
                  </a-box>

                  <a-entity position="-20 0.11 -6" rotation="0 0 0" scale="0.01 0.01 0.01"
                     obj-model="mtl:/static/fci-obj/PRUEBA.mtl; obj:/static/fci-obj/PRUEBA.obj "> </a-entity>

                  <a-box id="pered t" width="150" height="9.6" depth="0.1" position="0 0 24" visible="false" static-body></a-box>
                  <a-box id="pered tr" width="150" height="9.6" depth="0.1" position="0 0 -24" visible="false" static-body></a-box>
                  <a-box id="pered tra" width="0.1" height="9.6" depth="50" position="65 0 0" visible="false" static-body></a-box>
                  <a-box id="pered tras" width="0.1" height="9.6" depth="50" position="-40 0 0" visible="false" static-body></a-box>

                  <a-entity position="22 6.3 5.5" material="color: lightgrey"
                     text="align:center;value:FACULTAD DE CIENCIAS INFORMATICAS ;width:17;color:#fff;font:mozillavr"></a-entity>>
               </a-scene>
            }
         </div>
         // </body>
      )
   }
}