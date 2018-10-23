import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Observable } from 'rxjs'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage = HelloIonicPage;
  pages: Array<{ title: string, component: any }>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Hello Ionic', component: HelloIonicPage },
      { title: 'My First List', component: ListPage }
    ];
    this.testObservable();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }

  testObservable() {

    // // This function runs when subscribe() is called
    // function sequenceSubscriber(observer) {
    //   // synchronously deliver 1, 2, and 3, then complete
    //   observer.next("z");
    //   observer.next("i");
    //   observer.error("error porque se me dio la gana");
    //   observer.next("h");
    //   observer.complete();

    //   // unsubscribe function doesn't need to do anything in this
    //   // because values are delivered synchronously
    //   return { unsubscribe() { } };
    // }

    // // Create a new Observable that will deliver the above sequence
    // const sequence = new Observable(sequenceSubscriber);

    // // execute the Observable and print the result of each notification
    // sequence.subscribe({
    //   next(num) { console.log(num); },
    //   complete() { console.log('Finished sequence'); },
    //   error(err){alert(err)}
    // });
    const observers=[];
    function avisar(observer){
        
        observers.push(observer);
        setTimeout(()=>{
          observers[0].next("va a salir el avion");
          observers[1].next("su avion no va a salir")
          observers.forEach(obs=> obs.complete());
        },5000)
    }
    const taquilla=new Observable(avisar);

    const persona1={
      next(info){
        console.log("observador 1: taquilla dijo que "+ info);
      },
      complete(){
        console.log("obs 1: ya me voy en el avion");
      },
      error(err){
        console.error(err);
        
      }
    }

    const persona2={
      next(info){
        console.log("observador 2: taquilla dijo que "+ info);
      },
      complete(){
        console.log("observador 2: me voy para la casa");
      },
      error(err){
        console.error(err);
        
      }
    }

    taquilla.subscribe(persona1);
    taquilla.subscribe(persona2);
  }
}
