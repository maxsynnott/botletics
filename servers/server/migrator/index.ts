// Currently Prisma doesn't support programmatically migrating which is why we have to use the cli commands
// TODO: Check if Prisma has added support for this
import execa from 'execa'

export const handler = async () => {
	const { stdout } = execa.sync('node', [
		'./node_modules/prisma/build/index.js',
		'migrate',
		'deploy',
	])
	return stdout
}
