//
//  eeuiContactAppModule.m
//  Pods
//

#import "eeuiContactAppModule.h"
#import <WeexPluginLoader/WeexPluginLoader.h>
#import "LJContactManager.h"
#import "LJPerson.h"

@interface eeuiContactAppModule ()

@end

@implementation eeuiContactAppModule

@synthesize weexInstance;

WX_PlUGIN_EXPORT_MODULE(eeuiContact, eeuiContactAppModule)
WX_EXPORT_METHOD(@selector(lists:))
WX_EXPORT_METHOD(@selector(section:))


//获取联系人
- (void)lists:(WXModuleCallback)callback {
    if (callback == nil) {
        return;
    }
    [[LJContactManager sharedInstance] accessContactsComplection:^(BOOL succeed, NSArray<LJPerson *> *contacts) {
        if (succeed) {
            NSMutableArray *lists = @[].mutableCopy;
            for (LJPerson *person in contacts) {
                NSMutableArray *phones = @[].mutableCopy;
                for (LJPhone *model in person.phones) {
                    [phones addObject:model.phone];
                }
                [lists addObject:@{
                        @"name": person.fullName,
                        @"phones": phones,
                        @"photo": [self saveImage:person.image name:[WXUtility md5:person.fullName]],
                }];
            }
            callback(@{@"status": @"success", @"lists": lists});
        } else {
            callback(@{@"status": @"error", @"error": @"没有访问通讯录相关权限"});
        }
    }];
}

//获取联系人（分组）
- (void)section:(WXModuleCallback)callback {
    if (callback == nil) {
        return;
    }
    [[LJContactManager sharedInstance] accessSectionContactsComplection:^(BOOL succeed, NSArray<LJSectionPerson *> *contacts, NSArray<NSString *> *keys) {
        if (succeed) {
            NSMutableArray *section = @[].mutableCopy;
            for (LJSectionPerson *sectionModel in contacts) {
                NSMutableArray *lists = @[].mutableCopy;
                for (LJPerson *person in sectionModel.persons) {
                    NSMutableArray *phones = @[].mutableCopy;
                    for (LJPhone *model in person.phones) {
                        [phones addObject:model.phone];
                    }
                    [lists addObject:@{
                            @"name": person.fullName,
                            @"phones": phones,
                            @"photo": [self saveImage:person.image name:[WXUtility md5:person.fullName]],
                    }];
                }
                [section addObject:@{
                        @"key": sectionModel.key,
                        @"lists": lists
                }];
            }
            callback(@{@"status": @"success", @"section": section});
        } else {
            callback(@{@"status": @"error", @"error": @"没有访问通讯录相关权限"});
        }
    }];
}


- (NSString *)saveImage:(UIImage *)image name:(NSString *)name {
    if (image == nil) {
        return @"";
    }
    NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
    NSString *filePath = [paths[0] stringByAppendingPathComponent:[NSString stringWithFormat:@"%@", name]];
    BOOL result = [UIImagePNGRepresentation(image) writeToFile:filePath atomically:YES];
    return result == YES ? filePath : @"";
}

@end
