<style lang="sass">
.new-tweet
  textarea
    font-size: 19px
    line-height: 1.4 !important
.divider
  border-top: 1px solid
  border-bottom: 1px solid
  border-color: $grey-4
.tweet-content
  white-space: pre-line 
.tweet-icons
  margin-left: -5px
.tweet:not(:first-child)
  border-top: 1px solid rgba(0,0,0,0.12)       
</style>

<template>
  <q-page class="relative-position">
  <q-scroll-area class="absolute full-width full-height">
    <div class="q-py-lg q-px-md row items-end q-col-gutter-md">
      <div class="col">
        <q-input class="new-tweet" bottom-slots v-model="newTweetContent" label="What's happening?" counter
          maxlength="280" :dense="dense" autogrow>
          <template v-slot:before>
            <q-avatar size="xl">
              <img src="../../public/img/me.jpg">
            </q-avatar>
          </template>
        </q-input>
      </div>

      <div class="col col-shrink">
        <q-btn
          @click="addNewTweet" 
          class="q-mb-lg" 
          :disable="!newTweetContent" 
          unelevated 
          rounded 
          color="primary" 
          label="Tweet" 
          no-caps 
        />
      </div>

    </div>
    <q-separator class="divider" size="10px" color="grey-2" />

    <q-list separator>
    <transition-group
      appear
      enter-active-class="animated fadeIn slow"
      leave-active-class="animated fadeOut slow"
    >
      <q-item 
        class="q-py-md tweet"
        v-for="tweet in tweets"
        :key="tweet.id"
        >
        <q-item-section avatar top>
          <q-avatar size="xl">
            <img src="../../public/img/me.jpg">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-subtitle1">
            <strong>Oscar Fenn</strong>
            <span class="text-grey-7"> @oscarfenn 
            <br class="lt-md">&bull; {{relativeDate(tweet.date)}}
            </span>
          </q-item-label>
          <q-item-label class="tweet-content text-body1">
            {{tweet.content}}
          </q-item-label>
          <div class="row justify-between q-mt-sm tweet-icons">
            <q-btn 
              flat round 
              color="grey" 
              icon="far fa-comment"
              size="sm" 
              />
              <q-btn 
              flat round 
              color="grey" 
              icon="fas fa-retweet"
              size="sm" 
              />
              <q-btn
              @click="toggleLiked(tweet)" 
              flat 
              round
              :color="tweet.liked ? 'pink' : 'grey'"
              :icon="tweet.liked ? 'fas fa-heart' : 'far fa-heart'"
              size="sm" 
              />
              <q-btn
              @click="deleteTweet(tweet)" 
              flat round 
              color="grey" 
              icon="fas fa-trash"
              size="sm" 
              />
          </div>
        </q-item-section>

        
      </q-item>
      </transition-group>
    </q-list>
    </q-scroll-area>
  </q-page>
</template>

<script>
import db from 'src/boot/firebase'
import { formatDistance} from 'date-fns'
import { collection, query, where, onSnapshot, orderBy, doc, setDoc, addDoc, deleteDoc, updateDoc } from "firebase/firestore";


export default {
  name: 'PageHome',
  data() {
    return {
      newTweetContent: '',
      tweets: [
        // {
         // content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Ut id rhoncus lectus. Praesent ut turpis feugiat, porta tellus at, ullamcorper lectus. Curabitur accumsan molestie venenatis. Pellentesque auctor sollicitudin ipsum eu vulputate.',
         // date: 1667950875913
       // },
      //  {
        //  content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Ut id rhoncus lectus. Praesent ut turpis feugiat, porta tellus at, ullamcorper lectus. Curabitur accumsan molestie venenatis. Pellentesque auctor sollicitudin ipsum eu vulputate.',
        //  date: 1667950875913
      //  },
      ]
    }
  },
  
  methods: {
  relativeDate(value) {
    return formatDistance(value, new Date())
  },
  addNewTweet() {
  let newTweet = {
    content: this.newTweetContent,
    date: Date.now(),
    liked: false
  }
 // this.tweets.unshift(newTweet)
 addDoc(collection(db, "tweets"), newTweet);

  this.newTweetContent = ''
},
deleteTweet(tweet) {
  deleteDoc(doc(db, "tweets", tweet.id));

},
toggleLiked(tweet) {

      updateDoc(doc(db, "tweets", tweet.id), {

        liked: !tweet.liked,

      });

    }, 
},
  mounted() {
  const q = query(collection(db, "tweets"), orderBy("date"))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        let tweetChange = change.doc.data()
        tweetChange.id = change.doc.id
        if (change.type === "added") {
            console.log("New tweet: ", tweetChange)
            this.tweets.unshift(tweetChange)
        }
        if (change.type === "modified") {
            console.log("Modified tweet: ", tweetChange)
            let index = this.tweets.findIndex(tweet => tweet.id === tweetChange.id)
            Object.assign(this.tweets[index], tweetChange)
        }
        if (change.type === "removed") {
            console.log("Removed tweet: ", tweetChange)
            let index = this.tweets.findIndex(tweet => tweet.id === tweetChange.id)
            this.tweets.splice(index, 1)
        }
      })
    })
},
}
</script>
