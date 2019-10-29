import { Component, OnInit } from '@angular/core';
import { Injectable, NgZone } from '@angular/core';
// import { Observable } from 'rxjs/Rx';
// import * as _ from "lodash";
declare var webkitSpeechRecognition: any;


// interface IWindow extends Window {
//     webkitSpeechRecognition: any;
//     SpeechRecognition: any;
// }

@Injectable()


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  // public reg: SpeechRecognition;
  // public  typ = typeof SpeechRecognition;
    // public reglist: SpeechGrammarList;
    // public typp = typeof SpeechGrammarList ;
  constructor() { 
    
  }
  ngOnInit() { 
    console.log("aaaaa");
        var reg = new webkitSpeechRecognition() ||  new SpeechRecognition();
        reg.lang = 'vi';
        reg.interimResults = true;
        let p = document.createElement('p');
        const words = document.querySelector('.words');
        words.appendChild(p);
        reg.addEventListener('result', e=>{
          // console.log(e.results);
          const transcript = Array.from(e.results).map(result=>result[0]).map(result=>result.transcript).join('');
          console.log(transcript);
        });
        reg.addEventListener('end',reg.start);
        reg.start()
        // reg.lang = 'vi';
        // reg.start();
        // reg.onresult = (event) => {
        //     console.log(event.results[0][0].transcript);            
        //     // this.index += event.results[0][0].transcript;

           
        // }        
  }  
  start() {
    
        console.log("aaaaa");
        var reg = new webkitSpeechRecognition() ||  new SpeechRecognition();
        reg.interimResults = true;
        reg.
        reg.lang = 'vi';
        reg.start();
        reg.onresult = (event) => {
            console.log(event.results[0][0].transcript);            
            // this.index += event.results[0][0].transcript;

           
        }        
        // this.reg.onstart = function() {
        //     console.log('Speech recognition service has started');
        // }
    
    }

}

