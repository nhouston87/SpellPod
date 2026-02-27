
Project Scope Questions
## 1) Users and Access
### Is launch scope single-user collections/decks only, or do we need shared/team collections?
#### This will be for single user collections and decks.
### Should decks be private-only at first, or support public profiles/decks?
#### Decks should be public by default allowing users to switch thier decks to be private or only shared with their playgroup. I want it to be very obvious though that its visibility will be set as public, private, or playgroup.
### Do we have compliance/privacy requirements at launch (US-only, GDPR readiness, account deletion/export)?
#### I dont think so, that seems like a larger concern beyond the scope of this project.
## 2) Card Data Source and Sync
### Will Scryfall be the canonical source of card data, with us caching selectively?
#### We will use scryfall to retireve card data and store small amounts of data about a card in a collection, we will need to see what kind of api query limits we run into with scryfall. I want to avoid storing a large amount of data if we can help it though.
### Is always-online acceptable for MVP, or do you want offline/local-first behavior?
#### I want always online, this will be a web app and not a desktop app. Down the line we can consider impementing a react native application that can have an offline mode.
### How fresh must card data be (on-demand fetch, scheduled sync, near real-time)?
#### I think this will really be determined on what our api query lmits are with scryfall. It may not be an issue at start with on demand fetch, but if the app gorws in popularity I can see that becoming a bottle neck down the line. Perhaps doing Scryfalls major download and storing card data locally in a Postgress DB or caching the card data on the server using something like a caching software might make more sense here.
## 3) Collection Data Model
### Do we track ownership by printing details (set, collector number, foil/non-foil, condition, language), or only card-level quantity?
#### Thats a good question, I am not looking to turn this into a system that tracks card value, price change, or a collections total worth so probably not with foil, but we can maybe allow for users to update the print version of their cards, where we default to the most recent print version of a card. We will probably want to give them an option for set tracking though so we can allow people to filter based on set when they are building decks. Langage support may also be a good idea. I dont think we need card condition though. I would like them to have a total number of cards they own in their collection and a flag we set on individual cards to let them know if they have a card being used in a deck.
### Do we need price tracking in MVP, or defer to later?
#### No, we wont need price tracking.
### Which import/export formats are required at launch (CSV, Arena, Moxfield, etc.)?
#### We will want text, csv, moxfield, and any other popular options that will be easy to support.
## 4) Commander Deck Rules
### Should MVP enforce strict Commander legality (color identity, singleton, banned list, commander eligibility)?
#### I think we should have these as filter options, we will need to have some way of storing or checking for the commander banned list. There are playgroups out there that allow for illegal cards to be their commanders and I want to include every playgroup playstyle here. We will impliment a playgroup mechanic as well that will allow users to form a group of other users, they can share decks with one another, and even set house rules in their playgroup if they want. They can track matches if they want as well so they can see how their decks perform offering some form of basic analytics feature.
### Should users be allowed to save intentionally illegal decks with warnings?
#### Yeah I think that would be the best approach, again some playgroups may allow them to do that so I dont want to not allow it.
### Are Commander variants needed in MVP (Partner, Background, etc.), or later?
#### We should account for this right upfront, including companion cards as well.
## 5) Search, Filters, and Tagging
### Which filters are mandatory in MVP vs phase 2 (type line, oracle text, mana value, colors, legality, rarity, price, tags)?
#### We want Type Line, Mana Cost, Oracle Text, Power, Toughness, Colors (with optoins here allowing for Exactly These Colors, Including These Colors, and Commander Colors), Sets, Rarity, Layout (split cards, flip, transform, Modal Double-Faced, Adventure, Meld, Leveler, Saga), Only In Collection (Only show cards in users collection), In Use (any cards being used in a deck), Not In Use (any cards not being used in a deck)
### Do we need saved filter presets and reusable deck-role tags (ramp/removal/draw/wincon) in MVP?
#### Not for MVP, filters can reset and users can set them to how they want.
### Should search default to “my collection first,” then global Scryfall results?
#### No we should default to global search, but we should make the UI very clear that they are searching globally and give them an option to only search their collection.
## 6) AI Assistant Scope
### Which AI features are in MVP (synergy suggestions, cut/add analysis, curve balancing, combo discovery)?
#### So what I am looking for here is something similar to what EDHREC uses, where suggestions and recommendations are based on what other decks using the same commander are using. Only it would be interesting to see if we can get an AI agent to determine this and offer suggested card synergies. We can even give a form like option that lets users provide specifics to form a prompt for the ai agent to put togehter suggestions. I am thinking suggestions along the lines of what other people are running based on a theme for a deck, or playstyle the player is looking for, or even a wild card option for crafting mad science deck options. The AI agent can also give recommendations on total number of cards that should be included in the deck like total creatures, total lands, total mana ramp options, protection, removal, interaction, etc.
### Should AI behavior prioritize reproducibility (same input -> similar output) or exploration?
#### I have found more success with exploration, but maybe we can offer some restrictive modes that have the ai agent be more perdicatble or an option that lets the ai explore more.
### What guardrails are required (no fabricated cards, card ID citations, rationale quality threshold)?
#### I think AI should be off by default but there should be some option in the UI that users get directed to using it.
## 7) Architecture and Backend Boundaries
### Are we committed to Firebase + Cloud Functions initially, or do you want a separate API service now?
#### Now that we are hashing everything out, I think Firebase for auth and storage, but a backend Node/Express api server would be ideal here.
### What scale should we design for in MVP (users, searches/day, deck saves/day)?
#### Starting out, a very small amount of users, expect maybe 10, with thoughts to expansion if I can market interest in it.
### Environment strategy: one Firebase project per env (dev/stage/prod) or simpler setup?
#### Lets have two, one for dev and staging, and one for prod. Lets also consider secrets management, does Firebase offer a secret server option?
## 8) Future Multiplayer Direction
### For the SpellTable-like expansion, do we eventually need in-browser video, or first just lobbies/game state?
#### We will want in-browser video and eventually a WebSockets backend allowing for users who are playing in person and only want to use a counter from their phone to track things like score, counters, and other options. But WebSockets I think will be necessary to keep all clients updated in real time.
### Should we define 8-player game-state contracts now, or defer until after deck builder MVP?
#### Lets defer until after the deck builder MVP, we will likely need a seperate React app and backend service for that feature and potentially use MFE for it.
### Do we expect spectator mode, match history, and event logs later?
#### A spectator mode would actually be pretty cool, assuming the spectator is in the playgroup. Eventually we will open up to public matches that allow users to connect to other SpellPod users to find matches.
## 9) Security and Abuse Prevention
### What anti-abuse controls are required at launch (rate limits, bot mitigation, moderation)?
#### Yes to rate limits and bot mitigation. Not sure how we do moderation though, so we will need to better understand what options we have there.
### Should security defaults be owner-only, with explicit sharing/public options?
#### Yes, user account details should be exclusive to the user themselves along with card collection. Sharing decks publicly or to their playgroup will be allowed, as outlined above we will also need playgroup settings that allow the playgroup owner to set, they can also set member role options for roles like admin or player.
### Do we need audit logs for destructive/sensitive actions (deletes, sharing changes, AI usage)?
#### Yes we will want this, we will likely need to store log data locally for up to 60 days.
## 10) Product, Delivery, and Quality Bar
### What is the MVP target date and non-negotiable feature list?
#### There is no target date for this project, we will work on it as I have time and get done what we can based on our MVP card list in our Trello Board
### Who is the initial audience (solo use, invite-only alpha, public beta)?
#### Initial audience will be my friends, we will see about expanding from there.
### What engineering rigor is required at launch (tests, CI gates, monitoring, analytics)?
#### We will want testing, monitoring, and analytics, so what ever tooling we can use there that is free. If we get bigger we can look to more professional tooling or even something like AWS stack options. We will also want to consider a good option for our CI/CD pipeline as well. For the start here, I will be hosting this site on my own personal machine that already has port forwarding set up and is acting as a game server at the moment.