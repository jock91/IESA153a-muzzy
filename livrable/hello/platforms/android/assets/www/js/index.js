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

            $("#load").click(function(){
                 var naming = $("#name").val();
                var mail = $("#email").val();

               function onSuccess(contacts) {
                     for (var i=0; i<contacts.length; i++) {
                        $("#search").html("Nom = <b>" + contacts[i].name + "</b>");
                    }
                };

                function onError(contactError) {
                    alert('onError!');
                };

                // Rechercher tous les contacts qui ont 'Bob' dans l'un de leurs champs de nom
                var options = new ContactFindOptions();
                options.filter = naming; 
                var fields = ["displayName", "name"];
                navigator.contacts.find(fields, onSuccess, onError, options);
            });
            $("#save").click(function(){
                var naming = $("#name").val();
                var mail = $("#email").val();

                //alert(name +"  "+mail);

                function onSuccess(contact) {
                    alert("Enregistrement réussi");
                };

                function onError(contactError) {
                    alert("Erreur = " + contactError.code);
                };



                // Créer un nouvel objet contact
                var contact = navigator.contacts.create();
                contact.displayName = "Plombier";
                contact.nickname = "Plombier";      // Préciser les deux propriétés pour que cela marche sur tous les mobiles

                // Renseigner quelques champs
                var name = new ContactName();
                name.givenName = naming;
                name.familyName = mail;
                contact.name = name;

                // Enregistrer dans la base du mobile
                contact.save(onSuccess,onError);
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