import {useQuery} from "@tanstack/react-query";
import {useClient} from "../context/auth-context.jsx";

const userQueryConfig = {
	staleTime: 1000 * 60 * 60,
	cacheTime: 1000 * 60 * 60,
}

const loadingUser = {
	email: 'loading email...',
	name: 'loading name...',
	dateFormat: 'loading dateFormat...',
	points: 'loading points...',
	level: 'loading level...',
}
function useUser() {
	const client = useClient()
	const {data} = useQuery({
		queryKey: ['me'],
		queryFn: () => client(`me`).then(data => data.user),
		...userQueryConfig,
	})
	return data ?? loadingUser
}

export {useUser}