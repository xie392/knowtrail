import { encryptPassword } from '../../common/utils/crypto'

describe('Crypto', () => {

    it('encryptPassword', () => {
        expect(encryptPassword('123456')).toBe('e10adc3949ba59abbe56e057f20f883e')
    })
})
