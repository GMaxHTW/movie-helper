<template>
  <router-view/>
</template>

<style lang="sass">

@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,500;0,700;1,300;1,500&display=swap')


html, body
  width: 100%
  height: auto
  margin: 0 auto
  font-family: "Josefin Sans", sans-serif
  overflow-x: hidden

h1, h2, h3, h4, h5, h6
  font-size: 25px
  line-height: 29px
  text-transform: uppercase
  color: $accentMain
  margin: 0
  padding: 0

h4, h5, h6
  color: $accentDark
  text-transform: uppercase
  font-weight: 500
  font-size: 20px
  line-height: 24px

p
  font-size: 18px
  line-height: 21px
  letter-spacing: 0.25px
  white-space: pre-wrap
  color: $textColor

.content
  width: 80%
  max-width: 1500px
  display: table
  margin: 0 auto
  position: relative
  @include screen-max($break1)
    width: 90%
  @include screen-max($break2)
    width: 75%
  @include screen-max($break3)
    width: 80%
  @include screen-max($break4)
    width: 90%


</style>
