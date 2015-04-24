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


        // onSuccess Geolocation
        $("#load").click(function(){
            navigator.geolocation.getCurrentPosition(onSuccess, onError);
  
            function onSuccess(position) {

            var element = document.getElementById('geolocation'),
                db     = openDatabase('mydb', '1.0', 'Test DB', 10000),
                msg    = '',
                status = document.getElementById('geolocation');
            element.innerHTML = 'Latitude: '           + position.coords.latitude              + '<br />' +
                                'Longitude: '          + position.coords.longitude             + '<br />' +
                                'Altitude: '           + position.coords.altitude              + '<br />';

                db.transaction(function (tx) {
                  tx.executeSql('CREATE TABLE IF NOT EXISTS GEOLOCALISATION (id, latitude, longitude, altitude)');
                  tx.executeSql('INSERT INTO GEOLOCALISATION (id, latitude, longitude, altitude)) VALUES (1, "2,36, "7,645", "0")');
                  tx.executeSql('INSERT INTO GEOLOCALISATION (id, latitude, longitude, altitude)) VALUES (2, "3048, "79,45", "1")');
                  msg = '<p>Geolocalition message created and row inserted.</p>';
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

    $("#old").click(function(){
        alert('TOTO');
        navigator.geolocation.getCurrentPosition(queryDB, errorDB);

            var msg    = '',
                status = document.getElementById('old-geoloc');

            alert('VAR');

        function queryDB(position, tx) {
            alert('EXECUTE');
            tx.executeSql('SELECT * FROM GEOLOCALISATION', [], querySuccess, errorDB);
            alert('DONE');
        };
            

        function querySuccess(tx, results) {
                alert('SUCCESS');
            var len = results.rows.length, i;
               alert('LEN');
               msg = "<p>Found rows: " + len + "</p>";
               alert('MSG');
               status.innerHTML +=  msg;
               alert('STATUS');
               for (i = 0; i < len; i++){
                 msg = "<p><b>" + results.rows.item(i).log + "</b></p>";
                 status.innerHTML +=  msg;
               }
        };

        function errorDB(err) {

            alert('code: '    + error.code    + '\n' +
            'message: ' + error.message + '\n');
        };

        function successDB(results) {
            var db = window.openDatabase('mydb', '1.0', 'Test DB', 10000);

            db.transaction(queryDB, errorDB);
        };

        db.transaction(successDB, errorDB);
        
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