<script lang="ts">
	export let resource = {
		name: "",
		image: "",
		slug: ""
	}
</script>

<a href="/{resource.slug}">
	<img src="/assets/{resource.image}" alt={resource.name} draggable="false" />
	<hr />
	<p>{resource.name}</p>
</a>
