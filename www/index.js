/// <reference types="aws-sdk" />

//https://aws.amazon.com/fr/blogs/mobile/use-amazon-mobile-analytics-with-your-javascript-enabled-apps/
/*$ionicPlatform.ready(function() {*/
    //Make sure region is 'us-east-1'
    AWS.config.region = 'us-east-1';
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'us-east-1:48879407-0827-4143-b72f-cdeb3cb9991d' //Amazon Cognito Identity Pool ID
    });

    var options = {
        appId : '496a9ce145e34e6b92e3000d202150c0', //Amazon Mobile Analytics App ID
        appTitle : 'ionicAWS',              //Optional e.g. 'Example App'
        appVersionName : '1.0', //Optional e.g. '1.4.1'
        appVersionCode : '000', //Optional e.g. '42'
        platform : 'Android', // IOS by default
    };

    var mobileAnalyticsClient = new AMA.Manager(options);
    console.log('Analytics initialized');

    // submitting an event
    // mobileAnalyticsClient.submitEvents();

    // submitting custom events
    mobileAnalyticsClient.recordEvent('CUSTOM EVENT NAME', {
        'ATTRIBUTE_1_NAME': 'ATTRIBUTE_1_VALUE',
        'ATTRIBUTE_2_NAME': 'ATTRIBUTE_2_VALUE'
    }, {
        'METRIC_1_NAME': 1,
        'METRIC_2_NAME': 99.3
    });

    mobileAnalyticsClient.recordEvent('Alerts', {
        'Area': 'Kitchen',
        'Connected objects concerned': 'Smoke and Leak detector'
    }, {
        'Smoke thickness': 45,
        'Leak': 93.7 // humidity percent
    });

    // submitting multiple custom events through a loop
    var max_event = 100;
    for (i = 0; i < max_event; i++)
    {
        mobileAnalyticsClient.recordEvent('Looped Event', {
            'attribute_name': 'attribute_value'+i
        }, {
            'metric_value': i*100
        });
        console.log(i);
    }

    // submitting monetization event
    mobileAnalyticsClient.recordMonetizationEvent(
        {
            productId : 'testMonetization',   //Required e.g. 'My Example Product'
            price : 1.42,            //Required e.g. 1.99
            quantity : 4,      //Required e.g. 1
            currency : 'USD'  //Optional ISO currency code e.g. 'USD'
        }
    );
    mobileAnalyticsClient.recordMonetizationEvent(
        {
            productId : 'pastry1',   //Required e.g. 'My Example Product'
            price : 1.42,            //Required e.g. 1.99
            quantity : 4,      //Required e.g. 1
            currency : 'USD'  //Optional ISO currency code e.g. 'USD'
        },
        {
            'Croissant': 'true',
            'Scone': 'false'
        },
        {
            'Quality': 'Tasty',
            'Weight': 75 // in grams
        }
    );

    //retrieving session id
    var identityId = AWS.config.credentials.identityId;
    console.log(identityId);
/*
});*/
