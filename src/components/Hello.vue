<template>
  <v-layout row wrap>
    <v-flex xs12 class="text-xs-center">
      <v-btn primary dark @click.native.stop="dialog = true">
        <v-icon left>add</v-icon> New Task
      </v-btn>
      <v-dialog v-model="dialog">
        <v-card>
          <v-card-title>
            <span class="headline"><v-icon left>add</v-icon> New Task</span>
          </v-card-title>
          <v-card-text>
            <v-text-field v-model="title" label="Title" required></v-text-field>
            <v-text-field v-model="description" label="Description" multi-line required></v-text-field>
            <v-text-field v-model="to" label="To" hint="Your team member" required></v-text-field>
            <v-text-field v-model="point" label="Point" type="number" required></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="blue--text darken-1" flat @click.native="dialog = false">Close</v-btn>
            <v-btn class="blue--text darken-1" flat @click.native="newTask">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-flex>
    <v-flex xs12 sm6 md3>
      <Phase
        title="Back Log"
        listen="backlog"
        :left="false"
        right="todo"
      ></Phase>
    </v-flex>
    <v-flex xs12 sm6 md3>
      <Phase
        title="To Do"
        listen="todo"
        left="backlog"
        right="doing"
      ></Phase>
    </v-flex>
    <v-flex xs12 sm6 md3>
      <Phase
        title="Doing"
        listen="doing"
        left="todo"
        right="done"
      ></Phase>
    </v-flex>
    <v-flex xs12 sm6 md3>
      <Phase
        title="Done"
        listen="done"
        left="doing"
        :right="false"
      ></Phase>
    </v-flex>
  </v-layout>
</template>

<script>
import Phase from '@/components/Phase'
export default {
  components: {
    Phase
  },
  data () {
    return {
      dialog: false,
      title: null,
      description: null,
      to: null,
      point: null
    }
  },
  methods: {
    newTask () {
      this.$db.ref('tasks').child('backlog').push({
        title: this.title,
        description: this.description,
        to: this.to,
        point: this.point
      })
      this.dialog = false
      this.title = null
      this.description = null
      this.to = null
      this.point = null
    }
  }
}
</script>
