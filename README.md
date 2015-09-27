# hackgt-fall-2015


![Screenshot of Virtuocity](/screenshot.png)


Check it out at [http://virtuocity.cloudapp.net/](http://virtuocity.cloudapp.net/).

---

https://github.com/1heart/hackgt-fall-2015

Half our team is first time hackers, so perhaps we were a little too naive: to build something that can actually have an impact over a weekend. 

The problem we chose was something close to our hearts: that of addiction and the immense struggle against relapse. We're all slightly addicted to something, be it food, video games, or something darker. We designed an app that takes your location and your self-professed vices, attached a location to that using Yelp API, and took an escalation management approach to helping you avoid them. Our app automatically detects when you enter an establishment that you deem dangerous-- be it a casino, bar, or just the Apple store-- and takes steps (starting with a gentle reminder and up to SMSing a trusted emergency contact) when you stay there too long.

How do we do it? It's a Meteor app running on an Azure box, integrating with the Yelp and Twilio APIs  . This means that we cover iOS, Android, and web at the same time. When you're within a predetermined radius of a place deemed by yourself to be an unsafe type, we track how long you've been there. Then we take steps including up to sending an SMS to a self-inputted emergency contact to gently persuade you from doing something you may regret later on.

Building the app was certainly a challenge. All of us were new to the technologies involved (Meteor, Yelp, Twilio) and most of us were new to web app development in general (or even Github!). We had pretty insane times trying to figure out why the entire app decided not to work at random times, or how to properly wrap an OAuth authorization around an API call so it would actually work. Overall, it was an incredibly fun (and a bonding experience, to say the least), so thanks Hack/SnackGT!
