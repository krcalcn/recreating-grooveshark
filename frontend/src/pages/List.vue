<template>
  <q-page padding>
    <div class="col-9 q-mx-auto bg-white q-mt-xl q-pa-xl">
    <q-table
      title="Playlist Name"
      :data="data"
      :columns="songColumns"
      row-key="name"
    />
    </div>
  </q-page>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      songColumns: [
        {
          name: 'name',
          required: true,
          label: 'Name',
          align: 'left',
          field: 'name',
          sortable: true,
        },
        {
          name: 'artists',
          required: true,
          label: 'Artist',
          align: 'left',
          field: 'artists',
          format: (val) => val.map((a) => a.name).join(','),
          sortable: true,
        },
      ],
      data: [
        {
          name: 'Derine',
          artists: [
            {
              name: 'Palmiyeler',
            },
            {
              name: 'Pal',
            },
          ],
        },
        {
          name: 'Derine2',
          artists: [
            {
              name: 'Palmiyeler2',
            },
          ],
        },
      ],
    };
  },
  methods: {
  },
  mounted() {
    console.log(this.data);
  },
};
</script>
