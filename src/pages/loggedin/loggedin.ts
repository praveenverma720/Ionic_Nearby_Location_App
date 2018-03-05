import { Component,  NgZone } from '@angular/core';
import { IonicPage,LoadingController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';



declare var google;



@IonicPage()
@Component({
  selector: 'page-loggedin',
  templateUrl: 'loggedin.html',
})
export class LoggedinPage {


  map: any;
  markers: any;
  autocomplete: any;
  GoogleAutocomplete: any;
  GooglePlaces: any;
  geocoder: any
  autocompleteItems: any;
  loading: any;

  
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

  constructor(
    public zone: NgZone,
    public geolocation: Geolocation,
    public loadingCtrl: LoadingController) {

    this.geocoder = new google.maps.Geocoder;
    let elem = document.createElement("div")
    this.GooglePlaces = new google.maps.places.PlacesService(elem);
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = {
      input: '' };

    this.autocompleteItems = [];
    this.markers = [];
    this.loading = this.loadingCtrl.create();
  }




  ionViewDidEnter(){
      // let infoWindow = new google.maps.InfoWindow({map: map});
      //Set latitude and longitude of some place
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 17.3850, lng: 78.4867},
      zoom: 15
    });
  }



  updateSearchResults(){
    if (this.autocomplete.input == '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
      (predictions, status) => {
        this.autocompleteItems = [];
        if(predictions){
          this.zone.run(() => {
            predictions.forEach((prediction) => {
              this.autocompleteItems.push(prediction);
            });
          });
        }
    });
  }


  selectSearchResult(item){
  console.log("item value",item);
    this.clearMarkers();
    this.autocompleteItems = [];

    this.geocoder.geocode({'placeId': item.place_id}, (results, status) => {
      if(status === 'OK' && results[0]){
        // let position = {
        //     lat: results[0].geometry.location.lat,
        //     lng: results[0].geometry.location.lng
        // };
        let marker = new google.maps.Marker({
          position: results[0].geometry.location,
          map: this.map
        });
        console.log(marker);
        this.markers.push(marker);
        this.map.setCenter(results[0].geometry.location);
      }
    })
  }


  clearMarkers(){
    for (var i = 0; i < this.markers.length; i++) {
      console.log(this.markers[i])
      this.markers[i].setMap(null);
    }
    this.markers = [];
  }

}