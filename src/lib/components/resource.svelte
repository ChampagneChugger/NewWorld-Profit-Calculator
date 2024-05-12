<script lang="ts">
	type resource = {
		name: string
		image: string
		slug: string
		prismatic?: boolean
	}

	export let resource: resource = {
		name: "",
		image: "",
		slug: "",
		prismatic: undefined
	}
</script>

<a href={resource.prismatic ? `/prismatic/${resource.slug}` : `/${resource.slug}`}>
	<img src="/assets/{resource.image}" alt={resource.name} draggable="false" />
	<p>{resource.name}</p>
</a>
