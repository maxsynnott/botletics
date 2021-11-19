// TODO: Check if Prisma has added support yet for programmatically running migrating
import execa from 'execa'

export const handler = async () => {
	const { stdout } = execa.sync('node', [
		'./node_modules/prisma/build/index.js',
		'migrate',
		'deploy',
	])
	return stdout
}
