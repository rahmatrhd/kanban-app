<template>
  <v-container grid-list-md class="pa-0">
    <v-layout column>
      <v-flex>
        <v-card dark>
          <v-subheader dark>{{ title }}</v-subheader>
          <v-divider></v-divider>
        </v-card>
      </v-flex>

      <v-flex
        v-for="(list, index) in lists"
        :key="list['.key']"
      >
        <v-card>
          <v-card-actions>
            <v-btn class="blue--text text--darken-2" icon :disabled="!leftButton" @click="leftTask(index)"><v-icon v-show="leftButton">keyboard_arrow_left</v-icon></v-btn>
            <span class="spacer"><strong>{{ list.title }}</strong></span>
            <v-btn class="blue--text text--darken-2" icon :disabled="!rightButton" @click="rightTask(index)"><v-icon v-show="rightButton">keyboard_arrow_right</v-icon></v-btn>
          </v-card-actions>
          <v-card-text class="grey--text text--darken-3 pt-0">
            {{ list.description }}
          </v-card-text>
          <v-card-text class="grey--text text--darken-3 py-0">
            <span><strong>Assigned to:</strong></span> {{ list.to }}
            <br>
            <span><strong>Point:</strong></span> {{ list.point }}
          </v-card-text>
          <v-card-actions class="pt-0">
            <v-spacer></v-spacer>
            <v-btn class="red--text text--darken-2" icon @click="deleteTask(list['.key'])"><v-icon>delete</v-icon></v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ['title', 'listen', 'left', 'right'],
  // data () {
  //   return {
  //     title: 'Back Log',
  //     listen: 'backlog',
  //     left: false,
  //     right: 'todo'
  //   }
  // },
  computed: {
    leftButton () {
      return typeof this.left === 'string'
    },
    rightButton () {
      return typeof this.right === 'string'
    }
  },
  firebase () {
    return {
      lists: this.$db.ref('tasks').child(this.listen)
    }
  },
  methods: {
    leftTask (index) {
      let task = this.lists[index]
      this.$db.ref('tasks').child(this.listen).child(task['.key']).remove()
      this.$db.ref('tasks').child(this.left).child(task['.key']).set({
        title: task.title,
        description: task.description,
        to: task.to,
        point: task.point
      })
    },
    rightTask (index) {
      let task = this.lists[index]
      this.$db.ref('tasks').child(this.listen).child(task['.key']).remove()
      this.$db.ref('tasks').child(this.right).child(task['.key']).set({
        title: task.title,
        description: task.description,
        to: task.to,
        point: task.point
      })
    },
    deleteTask (key) {
      this.$db.ref('tasks').child(this.listen).child(key).remove()
    }
  }
}
</script>
