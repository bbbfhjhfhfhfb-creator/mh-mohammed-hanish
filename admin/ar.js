CMS.registerLocale("ar", {
  "auth": {
    "login": "تسجيل الدخول",
    "loggingIn": "جارٍ تسجيل الدخول…",
    "loginWithNetlifyIdentity": "Login with Netlify Identity",
    "loginWithAzure": "Login with Azure",
    "loginWithBitbucket": "Login with Bitbucket",
    "loginWithGitHub": "الدخول بحساب GitHub",
    "loginWithGitLab": "Login with GitLab",
    "loginWithGitea": "Login with Gitea",
    "loginWithForgejo": "Login with Forgejo",
    "errors": {
      "email": "Make sure to enter your email.",
      "password": "Please enter your password.",
      "identitySettings": "Unable to access identity settings. When using git-gateway backend make sure to enable Identity service and Git Gateway."
    }
  },
  "app": {
    "header": {
      "content": "المحتوى",
      "workflow": "مسار المراجعة",
      "deploys": "عمليات النشر",
      "deploysDeployed": "Deployed",
      "deploysPublishing": "Publishing…",
      "deploysBuilding": "Building",
      "deploysFailed": "Build failed",
      "media": "مكتبة الوسائط",
      "quickAdd": "إضافة سريعة"
    },
    "app": {
      "errorHeader": "تعذر تحميل إعدادات اللوحة",
      "configErrors": "أخطاء الإعداد",
      "checkConfigYml": "راجع ملف config.yml",
      "loadingConfig": "جارٍ تحميل الإعدادات…",
      "waitingBackend": "بانتظار خدمة الحفظ…"
    },
    "notFoundPage": {
      "header": "غير موجود"
    }
  },
  "collection": {
    "sidebar": {
      "collections": "أقسام المحتوى",
      "allCollections": "جميع الأقسام",
      "searchAll": "البحث في الكل",
      "searchIn": "البحث في"
    },
    "collectionTop": {
      "sortBy": "الترتيب حسب",
      "viewAs": "طريقة العرض",
      "viewAsList": "قائمة",
      "viewAsGrid": "شبكة",
      "newButton": "＋ %{collectionLabel}",
      "newButtonAriaLabel": "Create entry of type %{collectionLabel}",
      "ascending": "تصاعدي",
      "descending": "تنازلي",
      "searchResults": "Search Results for \"%{searchTerm}\"",
      "searchResultsInCollection": "Search Results for \"%{searchTerm}\" in %{collection}",
      "filterBy": "تصفية حسب",
      "groupBy": "تجميع حسب"
    },
    "entries": {
      "loadingEntries": "جارٍ تحميل المحتوى…",
      "cachingEntries": "جارٍ تجهيز المحتوى…",
      "longerLoading": "قد يستغرق هذا بضع دقائق",
      "noEntries": "لا يوجد محتوى",
      "unpublishedHeader": "مسودات غير منشورة"
    },
    "groups": {
      "other": "أخرى",
      "negateLabel": "Not %{label}"
    },
    "defaultFields": {
      "author": {
        "label": "Author"
      },
      "updatedOn": {
        "label": "Updated On"
      }
    }
  },
  "editor": {
    "editorControl": {
      "field": {
        "optional": "اختياري",
        "widgetLabel": "%{widgetLabel} field"
      }
    },
    "editorControlPane": {
      "widget": {
        "required": "الحقل %{fieldLabel} مطلوب",
        "regexPattern": "قيمة %{fieldLabel} لا تطابق %{pattern}",
        "processing": "جارٍ معالجة %{fieldLabel}",
        "range": "%{fieldLabel} must be between %{minValue} and %{maxValue}.",
        "min": "%{fieldLabel} must be at least %{minValue}.",
        "max": "%{fieldLabel} must be %{maxValue} or less.",
        "rangeCount": "%{fieldLabel} must have between %{minCount} and %{maxCount} item(s).",
        "rangeCountExact": "%{fieldLabel} must have exactly %{count} item(s).",
        "rangeMin": "%{fieldLabel} must be at least %{minCount} item(s).",
        "rangeMax": "%{fieldLabel} must be %{maxCount} or less item(s).",
        "invalidPath": "'%{path}' is not a valid path",
        "pathExists": "Path '%{path}' already exists"
      },
      "i18n": {
        "writingInLocale": "Writing in %{locale}",
        "copyFromLocale": "Fill in from another locale",
        "copyFromLocaleConfirm": "Do you want to fill in data from %{locale} locale?\nAll existing content will be overwritten."
      }
    },
    "editor": {
      "onLeavePage": "هل تريد مغادرة الصفحة؟",
      "onUpdatingWithUnsavedChanges": "احفظ التغييرات قبل تغيير الحالة",
      "onPublishingNotReady": "غيّر الحالة إلى جاهز أولًا",
      "onPublishingWithUnsavedChanges": "احفظ التعديلات قبل النشر",
      "onPublishing": "هل تريد نشر هذا المحتوى إلى الفرع المحدد؟",
      "onUnpublishing": "هل تريد إلغاء النشر؟",
      "onDeleteWithUnsavedChanges": "هل تريد حذف المحتوى وتعديلاته غير المحفوظة؟",
      "onDeletePublishedEntry": "هل تريد حذف المحتوى المنشور؟",
      "onDeleteUnpublishedChangesWithUnsavedChanges": "هل تريد حذف المسودة والتعديلات غير المحفوظة؟",
      "onDeleteUnpublishedChanges": "هل تريد حذف جميع التعديلات غير المنشورة؟",
      "loadingEntry": "جارٍ تحميل المحتوى…",
      "confirmLoadBackup": "عُثر على نسخة محلية، هل تريد استعادتها؟"
    },
    "editorInterface": {
      "toggleI18n": "Toggle i18n",
      "togglePreview": "إظهار أو إخفاء المعاينة",
      "toggleScrollSync": "مزامنة التمرير",
      "toggleNotes": "الملاحظات"
    },
    "editorNotesPane": {
      "title": "الملاحظات",
      "emptyState": "لا توجد ملاحظات بعد",
      "addNote": "إضافة ملاحظة",
      "addPlaceholder": "اكتب ملاحظة…",
      "editPlaceholder": "تعديل الملاحظة…",
      "save": "حفظ المسودة",
      "cancel": "إلغاء",
      "edit": "تعديل",
      "delete": "حذف",
      "resolve": "تمت المعالجة",
      "unresolve": "إعادة فتح",
      "confirmDelete": "هل تريد حذف الملاحظة؟",
      "shortcut": "Tip: Press Ctrl+Enter to add note quickly"
    },
    "editorToolbar": {
      "publishing": "جارٍ النشر…",
      "publish": "نشر إلى الفرع المحدد",
      "published": "منشور",
      "unpublish": "إلغاء النشر",
      "duplicate": "نسخ",
      "unpublishing": "جارٍ إلغاء النشر…",
      "publishAndCreateNew": "نشر وإنشاء جديد",
      "publishAndDuplicate": "نشر ونسخ",
      "deleteUnpublishedChanges": "حذف التغييرات غير المنشورة",
      "deleteUnpublishedEntry": "حذف المسودة",
      "deletePublishedEntry": "حذف المحتوى المنشور",
      "deleteEntry": "حذف المحتوى",
      "saving": "جارٍ الحفظ…",
      "save": "حفظ المسودة",
      "statusInfoTooltipDraft": "مسودة؛ غيّر الحالة إلى قيد المراجعة لطلب المراجعة",
      "statusInfoTooltipInReview": "المحتوى قيد المراجعة، ويمكن مواصلة تعديله",
      "deleting": "جارٍ الحذف…",
      "updating": "جارٍ التحديث…",
      "status": "الحالة: %{status}",
      "backCollection": "تحرير %{collectionLabel}",
      "unsavedChanges": "تغييرات غير محفوظة",
      "changesSaved": "تم حفظ التغييرات",
      "draft": "مسودة",
      "inReview": "قيد المراجعة",
      "ready": "جاهز",
      "publishNow": "نشر الآن إلى الفرع",
      "deployPreviewPendingButtonLabel": "التحقق من المعاينة",
      "deployPreviewButtonLabel": "عرض المعاينة",
      "deployButtonLabel": "عرض الموقع"
    },
    "editorWidgets": {
      "markdown": {
        "bold": "Bold",
        "italic": "Italic",
        "strikethrough": "Strikethrough",
        "code": "Code",
        "link": "Link",
        "linkPrompt": "Enter the URL of the link",
        "headings": "Headings",
        "quote": "Quote",
        "bulletedList": "Bulleted List",
        "numberedList": "Numbered List",
        "addComponent": "Add Component",
        "richText": "Rich Text",
        "markdown": "Markdown",
        "toggleMode": {
          "rich": "Toggle to rich text mode",
          "markdown": "Toggle to markdown mode"
        }
      },
      "image": {
        "choose": "اختيار ملف",
        "chooseMultiple": "اختيار ملفات",
        "chooseUrl": "إدراج رابط",
        "replaceUrl": "استبدال برابط",
        "promptUrl": "أدخل رابط الملف",
        "chooseDifferent": "اختيار ملف آخر",
        "addMore": "إضافة ملفات",
        "remove": "إزالة المرجع",
        "removeAll": "إزالة جميع المراجع"
      },
      "file": {
        "choose": "اختيار ملف",
        "chooseUrl": "إدراج رابط",
        "chooseMultiple": "اختيار ملفات",
        "replaceUrl": "استبدال برابط",
        "promptUrl": "أدخل رابط الملف",
        "chooseDifferent": "اختيار ملف آخر",
        "addMore": "إضافة ملفات",
        "remove": "إزالة المرجع",
        "removeAll": "إزالة جميع المراجع"
      },
      "unknownControl": {
        "noControl": "No control for widget '%{widget}'."
      },
      "unknownPreview": {
        "noPreview": "No preview for widget '%{widget}'."
      },
      "headingOptions": {
        "headingOne": "Heading 1",
        "headingTwo": "Heading 2",
        "headingThree": "Heading 3",
        "headingFour": "Heading 4",
        "headingFive": "Heading 5",
        "headingSix": "Heading 6"
      },
      "datetime": {
        "now": "Now",
        "clear": "Clear",
        "setToNow": "Set %{fieldLabel} to now"
      },
      "list": {
        "add": "إضافة %{item}",
        "addType": "إضافة %{item}"
      },
      "object": {
        "expand": "توسيع",
        "collapse": "طي"
      }
    }
  },
  "mediaLibrary": {
    "mediaLibraryCard": {
      "draft": "مسودة",
      "copy": "نسخ",
      "copyUrl": "نسخ الرابط",
      "copyPath": "نسخ المسار",
      "copyName": "نسخ الاسم",
      "copied": "تم النسخ"
    },
    "mediaLibrary": {
      "onDelete": "هل تريد حذف الملفات المحددة؟ راجع المراجع أولًا؛ قد تبقى مستخدمة في الموقع.",
      "fileTooLarge": "حجم الملف يتجاوز الحد %{size} كيلوبايت"
    },
    "mediaLibraryModal": {
      "loading": "جارٍ التحميل…",
      "close": "إغلاق",
      "noResults": "لا نتائج",
      "noAssetsFound": "لا توجد ملفات",
      "noImagesFound": "لا توجد صور",
      "private": "خاص",
      "images": "الصور",
      "mediaAssets": "الصور والفيديوهات والملفات",
      "search": "بحث…",
      "uploading": "جارٍ الرفع…",
      "upload": "رفع ملف",
      "download": "تنزيل",
      "deleting": "جارٍ الحذف…",
      "deleteSelected": "حذف المحدد",
      "chooseSelected": "اختيار المحدد"
    }
  },
  "ui": {
    "default": {
      "goBackToSite": "العودة للموقع"
    },
    "errorBoundary": {
      "title": "الملاحظات",
      "details": "There's been an error - please ",
      "reportIt": "open an issue on GitHub.",
      "detailsHeading": "Details",
      "privacyWarning": "Opening an issue pre-populates it with the error message and debugging data.\nPlease verify the information is correct and remove sensitive data if exists.",
      "recoveredEntry": {
        "heading": "Recovered document",
        "warning": "Please copy/paste this somewhere before navigating away!",
        "copyButtonLabel": "Copy to clipboard"
      }
    },
    "settingsDropdown": {
      "logOut": "تسجيل الخروج",
      "account": "خيارات الحساب"
    },
    "deploys": {
      "heading": "Deploys",
      "refresh": "Refresh",
      "refreshing": "Refreshing…",
      "viewSite": "View site",
      "summaryPublishing": "Publishing %{count} change(s) — waiting for your site to build.",
      "summaryBuilding": "Your site is building.",
      "summaryLive": "Your latest change is live. Deployed %{time}.",
      "summaryFailed": "The last build failed. Your most recent change is not on the site yet.",
      "summaryUnknown": "No deploy has been reported for this site yet.",
      "loadError": "Could not load deploys: %{details}",
      "multipleTargets": "Deploys are reported from more than one place: %{targets}.",
      "emptyConfigured": "Nothing recorded yet. If this site deploys on Netlify, add the deploy webhook in your Decap Turbo dashboard — Netlify does not report branch or production deploys to your git provider. Other hosts report automatically.",
      "emptyUnknown": "Loading deploys…",
      "liveOnBranchHint": "The current deploy of this branch, served at the branch's own URL — not the published site.",
      "stalledHint": "This build was still running when your host last mentioned it, and nothing has been reported since. A deploy preview whose branch was deleted mid-build ends this way.",
      "columnState": "State",
      "columnEntry": "Saved entry",
      "columnWhere": "Published to",
      "columnTarget": "Reported by",
      "columnCommit": "Commit",
      "columnWhen": "When",
      "state": {
        "pending": "Queued",
        "building": "Building",
        "live": "Live",
        "deployed": "Deployed",
        "failed": "Failed",
        "canceled": "Superseded",
        "stalled": "Unknown"
      }
    },
    "toast": {
      "onFailToLoadEntries": "تعذر تحميل المحتوى: %{details}",
      "onFailToLoadDeployPreview": "Failed to load preview: %{details}",
      "onFailToPersist": "تعذر الحفظ: %{details}",
      "onFailToDelete": "تعذر الحذف: %{details}",
      "onFailToUpdateStatus": "تعذر تحديث الحالة: %{details}",
      "missingRequiredField": "أكمل الحقول المطلوبة قبل الحفظ",
      "entrySaved": "تم حفظ المسودة",
      "entryPublishing": "Saved · Publishing…",
      "entryLive": "Your change to “%{entry}” is live",
      "entriesLive": "%{count} changes are live",
      "entryDeployFailed": "Your site failed to build",
      "viewSite": "View",
      "viewEntry": "View entry",
      "viewBuildLog": "View build log",
      "entryPublished": "تم النشر إلى الفرع",
      "entryUnpublished": "تم إلغاء النشر",
      "onFailToPublishEntry": "تعذر النشر: %{details}",
      "onFailToUnpublishEntry": "Failed to unpublish entry: %{details}",
      "entryUpdated": "تم تحديث الحالة",
      "onDeleteUnpublishedChanges": "هل تريد حذف جميع التعديلات غير المنشورة؟",
      "noteAdded": "Note added",
      "onFailToAddNote": "Failed to add note: %{details}",
      "noteUpdated": "Note updated",
      "onFailToUpdateNote": "Failed to update note: %{details}",
      "noteDeleted": "Note deleted",
      "onFailToDeleteNote": "Failed to delete note: %{details}",
      "noteResolved": "Note resolved",
      "noteReopened": "Note reopened",
      "onFailToToggleNote": "Failed to toggle note resolution: %{details}",
      "onFailToAuth": "%{details}",
      "onLoggedOut": "انتهت الجلسة؛ احتفظ بنسخة من تعديلاتك وسجّل الدخول مجددًا",
      "onBackendDown": "The backend service is experiencing an outage. See %{details} for more information"
    }
  },
  "workflow": {
    "workflow": {
      "loading": "جارٍ التحميل…",
      "workflowHeading": "مسار مراجعة المحتوى",
      "newPost": "محتوى جديد",
      "description": "%{smart_count} عنصر للمراجعة، %{readyCount} جاهز",
      "dateFormat": "MMMM D"
    },
    "workflowCard": {
      "lastChange": "%{date} بواسطة %{author}",
      "lastChangeNoAuthor": "%{date}",
      "lastChangeNoDate": "by %{author}",
      "deleteChanges": "حذف التعديلات",
      "deleteNewEntry": "حذف المحتوى الجديد",
      "publishChanges": "نشر التعديلات إلى الفرع",
      "publishNewEntry": "نشر المحتوى إلى الفرع"
    },
    "workflowList": {
      "onDeleteEntry": "هل تريد حذف هذا المحتوى؟",
      "onPublishingNotReadyEntry": "انقل المحتوى إلى جاهز قبل النشر",
      "onPublishEntry": "هل تريد النشر إلى الفرع المحدد؟",
      "draftHeader": "المسودات",
      "inReviewHeader": "قيد المراجعة",
      "readyHeader": "جاهز",
      "currentEntries": "%{smart_count} عنصر"
    }
  }
});
