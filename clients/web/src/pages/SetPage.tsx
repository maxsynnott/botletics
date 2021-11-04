import { useParams } from 'react-router'
import { useSet } from '../hooks/queries/useSet'

interface Params {
	id: string
}

export const SetPage = () => {
	const { id } = useParams<Params>()
	const { data: set } = useSet(id)

	return <pre>{JSON.stringify(set, null, 4)}</pre>
}
