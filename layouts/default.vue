<template>
  <div class="overflow-y-auto h-screen scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-slate-600">
    <div class="container m-auto font-montserrat">
      <Nuxt/>
    </div>
  </div>
</template>

<script>
export default {
  name:'Layout',
}
</script>

<style>
  .date_select {
    border: 1px solid white;
    -moz-appearance:none;
    -webkit-appearance:none;
    appearance:none;
    background: url("data:image/svg+xml,<svg fill='white' height='24' viewBox='5 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>") no-repeat right;
  }

  .date_select_edit {
    border: 1px solid #6b7280;
    -moz-appearance:none;
    -webkit-appearance:none;
    appearance:none;
    background: url("data:image/svg+xml,<svg fill='%239ca3af' height='24' viewBox='5 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>") no-repeat right;
  }

  .datepicker-cell {
    padding: 10px 10px;
  }

  .datepicker-picker .selected {
    background: #22d3ee;
  }

  .datepicker {
    z-index: 99;
  }

  div.date.mx-datepicker, div.date.mx-datepicker.disabled {
    width: 100%;
  }

  input.mx-input, div.mx-datepicker.disabled > div > input {
    padding-top: 20px;
    padding-bottom: 20px;
    background: #374151;
    color: white;
    width: 100%;
    border-color: #4b5563;
  }

  div.mx-datepicker.disabled > div > input {
    background: #1f2937;
  }

  input.mx-input:focus, div.mx-datepicker.disabled > div > input:focus {
    border-color: #67e8f9;
    outline: none;
  }

  i.mx-icon-clear:hover {
    color: #22d3ee;
  }

  i.mx-icon-calendar, i.mx-icon-clear {
    color: white;
  }

  div[modal-backdrop] {
    opacity: 0.8;
  }

  body { 
    background-color: #111827;
    color: white;
    font-family: 'Montserrat', Arial, sans-serif;
  }
</style>