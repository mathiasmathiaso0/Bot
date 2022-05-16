# Free games

## Example usage
```js
const games = await require("free-games")("en", "US")
    .then(games => games.filter(game =>
    game.price.totalPrice.discount &&
    game.price.totalPrice.originalPrice == game.price.totalPrice.discount));

console.log(games[0]);
```

## Example response
```js
[{
    "title": "Galactic Civilizations III",
    "id": "5d63b78c08184c10933a47874117db8c",
    "namespace": "3c52fbac843d4375803187739db84801",
    "description": "Build a civilization that will stand the test of time! Choose from dozens of unique races and make a name for yourself across the galaxy through diplomacy, espionage, technological advances, and more.",
    "effectiveDate": "2021-01-21T16:00:00.000Z",
    "offerType": "BASE_GAME",
    "expiryDate": null,
    "status": "ACTIVE",
    "isCodeRedemptionOnly": false,
    "keyImages": [{
        "type": "OfferImageWide",
        "url": "https://cdn1.epicgames.com/3c52fbac843d4375803187739db84801/offer/EGS_GalacticCivilizationsIIICoreEdition_StardockEntertainment_S1-2560x1440-54fd03f3d8441c3f43ad347e7c64da04.jpg"
    }, {
        "type": "OfferImageTall",
        "url": "https://cdn1.epicgames.com/3c52fbac843d4375803187739db84801/offer/EGS_GalacticCivilizationsIIICoreEdition_StardockEntertainment_S2-1200x1600-ef8767dbf731cda94a457c4a543341c1.jpg"
    }, {
        "type": "Thumbnail",
        "url": "https://cdn1.epicgames.com/3c52fbac843d4375803187739db84801/offer/EGS_GalacticCivilizationsIIICoreEdition_StardockEntertainment_S2-1200x1600-ef8767dbf731cda94a457c4a543341c1.jpg"
    }, {
        "type": "CodeRedemption_340x440",
        "url": "https://cdn1.epicgames.com/3c52fbac843d4375803187739db84801/offer/EGS_GalacticCivilizationsIIICoreEdition_StardockEntertainment_S2-1200x1600-ef8767dbf731cda94a457c4a543341c1.jpg"
    }, {
        "type": "DieselStoreFrontWide",
        "url": "https://cdn1.epicgames.com/3c52fbac843d4375803187739db84801/offer/EGS_GalacticCivilizationsIIICoreEdition_StardockEntertainment_S1-2560x1440-54fd03f3d8441c3f43ad347e7c64da04.jpg"
    }, {
        "type": "DieselStoreFrontTall",
        "url": "https://cdn1.epicgames.com/3c52fbac843d4375803187739db84801/offer/EGS_GalacticCivilizationsIIICoreEdition_StardockEntertainment_S2-1200x1600-ef8767dbf731cda94a457c4a543341c1.jpg"
    }],
    "seller": {
        "id": "o-l69v3ppj5zgdpwtuvq6sgjew5yjt5w",
        "name": "Stardock Entertainment, Inc"
    },
    "productSlug": "galactic-civilizations-iii",
    "urlSlug": "hydrageneralaudience",
    "url": null,
    "items": [{
        "id": "f2740e21bc3d494db1e4e2fc818e31a5",
        "namespace": "3c52fbac843d4375803187739db84801"
    }],
    "customAttributes": [{
        "key": "publisherName",
        "value": "Stardock Entertainment"
    }, {
        "key": "com.epicgames.app.productSlug",
        "value": "galactic-civilizations-iii"
    }],
    "categories": [{
        "path": "freegames"
    }, {
        "path": "games"
    }, {
        "path": "games/edition"
    }, {
        "path": "games/edition/base"
    }, {
        "path": "applications"
    }],
    "tags": [{
        "id": "1115"
    }, {
        "id": "9547"
    }, {
        "id": "1166"
    }],
    "catalogNs": {
        "mappings": [{
            "pageSlug": "galactic-civilizations-iii",
            "pageType": "productHome"
        }]
    },
    "offerMappings": [],
    "price": {
        "totalPrice": {
            "discountPrice": 0,
            "originalPrice": 499,
            "voucherDiscount": 0,
            "discount": 499,
            "currencyCode": "USD",
            "currencyInfo": {
                "decimals": 2
            },
            "fmtPrice": {
                "originalPrice": "$4.99",
                "discountPrice": "0",
                "intermediatePrice": "0"
            }
        },
        "lineOffers": [{
            "appliedRules": [{
                "id": "50a91efc62074ef0903655e48bd6eec4",
                "endDate": "2022-01-20T16:00:00.000Z",
                "discountSetting": {
                    "discountType": "PERCENTAGE"
                }
            }]
        }]
    },
    "promotions": {
        "promotionalOffers": [{
            "promotionalOffers": [{
                "startDate": "2022-01-13T16:00:00.000Z",
                "endDate": "2022-01-20T16:00:00.000Z",
                "discountSetting": {
                    "discountType": "PERCENTAGE",
                    "discountPercentage": 0
                }
            }]
        }],
        "upcomingPromotionalOffers": []
    }
}]
```