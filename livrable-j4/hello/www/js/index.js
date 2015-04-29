/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS"<b> BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {

        StatusBar.hide();


           /* var logToDom = function (message) {
                var e = document.createElement('label');
                e.innerText = message;

                var br = document.createElement('br');
                var br2 = document.createElement('br');
                document.body.appendChild(e);
                document.body.appendChild(br);
                document.body.appendChild(br2);

                window.scrollTo(0, window.document.height);
            };

            var delegate = new cordova.plugins.locationManager.Delegate();

            delegate.didDetermineStateForRegion = function (pluginResult) {

                logToDom('[DOM] didDetermineStateForRegion: ' + JSON.stringify(pluginResult));

                cordova.plugins.locationManager.appendToDeviceLog('[DOM] didDetermineStateForRegion: '
                    + JSON.stringify(pluginResult));
            };

            delegate.didStartMonitoringForRegion = function (pluginResult) {
                //console.log('didStartMonitoringForRegion:', pluginResult);

                logToDom('didStartMonitoringForRegion:' + JSON.stringify(pluginResult));
            };

            delegate.didRangeBeaconsInRegion = function (pluginResult) {
                logToDom('[DOM] didRangeBeaconsInRegion: ' + JSON.stringify(pluginResult));
                var beaconsFound = pluginResult.beacons;

                if ( beaconsFound && beaconsFound.length>0) {
                    alert('true');
                } else if (beaconsFound && beaconsFound.length <= 0) {
                    alert("false");
                }

            };

            var uuid = '17586a9d-1fd4-4b05-8a50-ac08b6fdc91c';
            var id = 'iBKS';
            var minor = 1;
            var major = 5000;
            var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(id, uuid, major, minor);

            cordova.plugins.locationManager.setDelegate(delegate);

            // required in iOS 8+
            cordova.plugins.locationManager.requestWhenInUseAuthorization(); 
            // or cordova.plugins.locationManager.requestAlwaysAuthorization()

            cordova.plugins.locationManager.startMonitoringForRegion(beaconRegion)
                .fail(console.error)
                .done();*/

            $("#load").click(function(){
                    var search = $("#mysearch").val();
                    function onSuccess(contacts) {
                        for (var i = 0; i < contacts.length; i++) {
                            $("#search").append( "<p class='searching'>Prénom : " + contacts[i].name.givenName + " Nom : " + contacts[i].name.familyName + "</p>" );
                        }
                        $(".searching").click( function(){
                            $(this).css({"color" : "#008F00"}).addClass("selected");
                            $("#send").show();
                        });
                        $('#send').click(function(){
                            $("#search").html("");
                            $(this).hide();
                        });
                    };

                    function onError(contactError) {
                        alert('onError!');
                    };

                    var options = new ContactFindOptions();
                    options.filter = search;
                    options.multiple = true; 
                    filter = ["name"];
                    navigator.contacts.find(filter, onSuccess, onError, options);
                });

            $("#lang").click(function(){
                
                 navigator.globalization.getPreferredLanguage(
                    function (language) {
                        alert('votre langue: ' + language.value + '\n');

                        if ($("#lang").hasClass("anglais")) {
                            $("#lang").removeClass("anglais").text("Changer de langue");
                            $(".photo").text("Ajouter une photo");
                            $(".geo").text("Se géolocaliser");
                            $("#load").text("Chercher des contacts");
                        }else {
                            $(".photo").text("Add picture");
                            $(".geo").text("To geolocate");
                            $("#lang").addClass("anglais").text("Change language");
                            $("#load").text("search contacts");
                        }

                        
                        
                    },
                    function () {alert('Error getting language\n');}
                );
            });
                $("#geo").click(function(){
                    navigator.geolocation.getCurrentPosition(onSuccess, onError);
          
                    function onSuccess(position) {

                    var element = document.getElementById('geolocation'),
                        db     = openDatabase('mydb', '1.0', 'Test DB', 10000),
                        msg    = '',
                        status = document.getElementById('old-geoloc');
                    element.innerHTML = 'Latitude: '           + position.coords.latitude              + '<br />' +
                                        'Longitude: '          + position.coords.longitude             + '<br />' +
                                        'Altitude: '           + position.coords.altitude              + '<br />';

                        db.transaction(function (tx) {
                          tx.executeSql('CREATE TABLE IF NOT EXISTS GEOLOCALISATION (id, latitude, longitude, altitude)');
                          tx.executeSql('INSERT INTO GEOLOCALISATION (id, latitude, longitude, altitude)) VALUES (1, "2,36, "7,645", "0")');
                          tx.executeSql('INSERT INTO GEOLOCALISATION (id, latitude, longitude, altitude)) VALUES (2, "3048, "79,45", "1")');
                          msg = '<p>Geolocalition message created and row inserted.</p>';
                          alert("position sauvegardée");
                          status.innerHTML =  msg;
                        });
                    };
                    // onError Callback receives a PositionError object
                    //
                    function onError(error) {
                        alert('code: '    + error.code    + '\n' +
                              'message: ' + error.message + '\n');
                    }
        });
    
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();